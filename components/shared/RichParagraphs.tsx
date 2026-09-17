/** Renders long-form copy with `\n\n` paragraphs and `**bold**` spans (FAQ / legal pages). */
export default function RichParagraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n/).map((part) => part.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>
          {paragraph.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) => {
            const bold = chunk.startsWith("**") && chunk.endsWith("**");
            if (!bold) return chunk;
            return <strong key={index}>{chunk.slice(2, -2)}</strong>;
          })}
        </p>
      ))}
    </>
  );
}
