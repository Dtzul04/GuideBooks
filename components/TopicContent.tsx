type TopicContentProps = {
  title: string;
  summary?: string;
  example?: string;
};

export default function TopicContent({
  title,
  summary,
  example,
}: TopicContentProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="leading-relaxed text-slate-700">
        {summary ?? "Summary coming soon."}
      </p>
      <pre className="overflow-x-auto rounded-2xl bg-slate-900/90 p-4 text-sm text-sky-100 shadow-md">
        {example ?? "Example coming soon."}
      </pre>
    </section>
  );
}
