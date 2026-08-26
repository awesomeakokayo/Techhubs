import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'

export const dynamic = 'force-dynamic'

function escapePdfText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

function centeredX(text: string, fontSize: number, pageWidth = 842): number {
  const estimatedWidth = text.length * fontSize * 0.5
  return Math.max(36, (pageWidth - estimatedWidth) / 2)
}

function buildCertificatePdf({ name, trackName, completedAt }: { name: string; trackName: string; completedAt: Date }): Uint8Array {
  const width = 842
  const height = 595
  const date = completedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const safeName = escapePdfText(name)
  const safeTrack = escapePdfText(trackName)
  const safeDate = escapePdfText(date)

  const stream = [
    'q',
    '0.93 0.76 0.22 RG',
    '5 w',
    '28 28 786 539 re S',
    '0.22 0.47 0.39 RG',
    '1.5 w',
    '42 42 758 511 re S',
    '0.10 0.16 0.13 rg',
    `BT /F1 13 Tf ${centeredX('TECHSKILLHUB', 13)} 494 Td (TECHSKILLHUB) Tj ET`,
    `BT /F1 31 Tf ${centeredX('CERTIFICATE OF COMPLETION', 31)} 425 Td (CERTIFICATE OF COMPLETION) Tj ET`,
    '0.30 0.34 0.32 rg',
    `BT /F1 12 Tf ${centeredX('This certifies that', 12)} 356 Td (This certifies that) Tj ET`,
    '0.10 0.48 0.36 rg',
    `BT /F1 27 Tf ${centeredX(safeName, 27)} 304 Td (${safeName}) Tj ET`,
    '0.30 0.34 0.32 rg',
    `BT /F1 12 Tf ${centeredX('has successfully completed the guided course', 12)} 260 Td (has successfully completed the guided course) Tj ET`,
    '0.10 0.16 0.13 rg',
    `BT /F1 21 Tf ${centeredX(safeTrack, 21)} 220 Td (${safeTrack}) Tj ET`,
    '0.30 0.34 0.32 rg',
    `BT /F1 11 Tf ${centeredX(safeDate, 11)} 175 Td (${safeDate}) Tj ET`,
    '0.74 0.74 0.70 RG',
    '1 w',
    '125 116 m 295 116 l S',
    '547 116 m 717 116 l S',
    '0.34 0.37 0.35 rg',
    'BT /F1 9 Tf 125 98 Td (Issued by) Tj ET',
    'BT /F1 10 Tf 125 82 Td (TechSkillHub) Tj ET',
    'BT /F1 9 Tf 547 98 Td (Credential) Tj ET',
    'BT /F1 10 Tf 547 82 Td (Course completion) Tj ET',
    'Q',
  ].join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`,
  ]

  const chunks: string[] = ['%PDF-1.4\n']
  const offsets: number[] = [0]
  let byteOffset = new TextEncoder().encode(chunks[0]).length

  objects.forEach((object, index) => {
    offsets[index + 1] = byteOffset
    const serialized = `${index + 1} 0 obj\n${object}\nendobj\n`
    chunks.push(serialized)
    byteOffset += new TextEncoder().encode(serialized).length
  })

  const xrefOffset = byteOffset
  const xref = [`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`]
  for (let index = 1; index <= objects.length; index += 1) {
    xref.push(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`)
  }
  chunks.push(xref.join(''))
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  return new TextEncoder().encode(chunks.join(''))
}

export async function GET(_request: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const track = getTrackById(params.trackId)
  if (!track) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  const completion = await prisma.courseCompletion.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
  })

  if (!completion) {
    return NextResponse.json({ error: 'Complete the course before downloading its certificate.' }, { status: 403 })
  }

  const pdf = buildCertificatePdf({
    name: session.user.name || 'TechSkillHub Learner',
    trackName: track.name,
    completedAt: completion.completedAt,
  })

  // Copy into a standalone ArrayBuffer so NextResponse receives a BodyInit type
  // accepted by the current TypeScript/Next.js runtime definitions.
  const body = new ArrayBuffer(pdf.byteLength)
  new Uint8Array(body).set(pdf)

  const filename = `techskillhub-${params.trackId}-certificate.pdf`
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
