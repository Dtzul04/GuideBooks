import Link from "next/link";
import content from "@/data/content.json";

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
          className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
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
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {lesson.title}
      </h1>
      <section className="space-y-4">
        <p className="whitespace-pre-line leading-relaxed text-slate-700">
          {lesson.summary ?? "Summary coming soon."}
        </p>
        <pre className="overflow-x-auto rounded-2xl bg-slate-900/90 p-4 text-sm text-sky-100 shadow-md">
          {lesson.example ?? "Example coming soon."}
        </pre>
      </section>
    </main>
  );
}
