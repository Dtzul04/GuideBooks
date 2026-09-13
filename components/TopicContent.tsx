type TopicContentProps = {
    title: string;
    summary?: string;
    example?: string;
}

export default function TopicContent({ title, summary, example }: TopicContentProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{summary ?? "Summary coming soon."}</p>
      <pre>{example ?? "Example coming soon."}</pre>
    </section>
  );
}
