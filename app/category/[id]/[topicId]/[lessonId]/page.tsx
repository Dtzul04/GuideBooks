import Link from "next/link";
import content from "@/data/content.json";
import CodeBlock from "@/components/CodeBlock";

// Shows one lesson's summary and code example
export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string; lessonId: string }>;
}) {
  // Read all three ids from the URL, then find the lesson step by step
  const { id, topicId, lessonId } = await params;
  const category = content.find((item) => item.id === id);
  const topic = category?.topics.find((item) => item.id === topicId);
  const lesson = topic?.lessons.find((item) => item.id === lessonId);

  // Any of the three ids didn't match, so there's no lesson to show
  if (!lesson) {
    return (
      <main>
        <Link
          href={`/category/${id}/${topicId}`}
          className="mb-3 inline-block text-sm font-medium text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Back
        </Link>
        <p>Lesson not found</p>
      </main>
    );
  }

  return (
    <main>
      {/* Back to the topic's lesson list */}
      <Link
        href={`/category/${id}/${topicId}`}
        className="mb-3 inline-block text-sm font-medium text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {lesson.title}
      </h1>
      <section className="space-y-4">
        <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
          {lesson.summary ?? "Summary coming soon."}
        </p>
        <CodeBlock code={lesson.example ?? "Example coming soon."} />

      </section>
    </main>
  );
}
