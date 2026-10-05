// summary and example are optional because some lessons don't have them yet
type TopicContentProps = {
  title: string;
  summary?: string;
  example?: string;
};

// The body of a lesson page: title, a short explanation, and a code example
export default function TopicContent({
  title,
  summary,
  example,
}: TopicContentProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="whitespace-pre-line leading-relaxed text-slate-700">
        {summary ?? "Summary coming soon."}
      </p>
      <pre className="overflow-x-auto rounded-2xl bg-slate-900/90 p-4 text-sm text-sky-100 shadow-md">
        {example ?? "Example coming soon."}
      </pre>
    </section>
  );
}
