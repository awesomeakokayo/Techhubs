interface StructuredDataProps {
  blocks: (string | null) | (string | null)[]
}

export function StructuredData({ blocks }: StructuredDataProps) {
  const list = Array.isArray(blocks) ? blocks : [blocks]
  const valid = list.filter((b): b is string => Boolean(b))
  return (
    <>
      {valid.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
    </>
  )
}