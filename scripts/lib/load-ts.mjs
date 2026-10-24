/**
 * Minimal TypeScript module loader for repo scripts.
 *
 * The catalogue modules in `lib/` are plain data + types with no runtime
 * dependencies on Next.js or the database. This helper transpiles such modules
 * (following one or more levels of local `./` imports) with the TypeScript
 * compiler API and imports the entry module from a temporary directory. It
 * exists so audit scripts can consume the *actual* catalogue data instead of
 * re-parsing TypeScript source with fragile regular expressions.
 *
 * Only use this for dependency-free local modules (e.g. `lib/tracks.ts`,
 * `lib/guided-path.ts`). Bare package imports (Next.js, Prisma, etc.) are not
 * bundled and will fail to resolve, by design.
 */

import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

function resolveLocal(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null
  const base = resolve(dirname(fromFile), specifier)
  for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, 'index.ts')]) {
    try {
      readFileSync(candidate)
      return candidate
    } catch {
      /* keep trying */
    }
  }
  return null
}

/**
 * Transpile `entry` and its local `./` dependency graph into a temp directory,
 * preserving relative file layout, then import the entry.
 */
export async function loadTsModule(entryAbsPath) {
  const ts = require('typescript')
  const root = dirname(entryAbsPath)
  const outDir = mkdtempSync(join(tmpdir(), 'tsh-load-'))
  const seen = new Map()
  const queue = [resolve(entryAbsPath)]

  try {
    while (queue.length) {
      const file = queue.shift()
      if (seen.has(file)) continue

      const source = readFileSync(file, 'utf8')
      const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2020,
          isolatedModules: true,
        },
        fileName: file,
      })

      const rel = relative(root, file).replace(/\\/g, '/').replace(/\.tsx?$/, '.mjs')
      const outFile = join(outDir, rel)
      mkdirSync(dirname(outFile), { recursive: true })
      seen.set(file, outFile)

      // Follow local imports, rewriting the specifier to the emitted file name.
      const rewritten = outputText.replace(
        /(from\s+['"])(\.[^'"]+)(['"])/g,
        (match, prefix, spec, suffix) => {
          const dep = resolveLocal(file, spec)
          if (dep && !seen.has(dep)) queue.push(dep)
          const depRel = dep ? relative(dirname(file), dep) : spec
          let normalized = depRel.replace(/\\/g, '/').replace(/\.tsx?$/, '.mjs')
          if (!normalized.startsWith('.')) normalized = `./${normalized}`
          return `${prefix}${normalized}${suffix}`
        },
      )
      writeFileSync(outFile, rewritten, 'utf8')
    }

    const entryOut = seen.get(resolve(entryAbsPath))
    return await import(pathToFileURL(entryOut).href)
  } finally {
    rmSync(outDir, { recursive: true, force: true })
  }
}
