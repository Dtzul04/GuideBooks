import Link from "next/link";
import content from "@/data/content.json";

// Lists the lessons in one topic (e.g. /category/languages/javascript)
export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string }>;
}) {
  // Read both ids from the URL, then find the category and the topic inside it.
  const { id, topicId } = await params;
  const category = content.find((item) => item.id === id);
  const topic = category?.topics.find((item) => item.id === topicId);

  return (
    <main>
      {/* Back to the category's topic list */}
      <Link
        href={`/category/${id}`}
        className="mb-3 inline-block text-sm font-medium text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {topic?.title}
      </h1>
      {/* One link per lesson, going to /category/[id]/[topicId]/[lessonId] */}
      <ul className="space-y-3">
        {topic?.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/category/${id}/${topicId}/${lesson.id}`}
              className="block rounded-xl border border-slate-200/70 bg-[var(--surface)] p-4 font-semibold text-slate-900 shadow-sm backdrop-blur-md transition duration-200 hover:border-sky-300 hover:bg-[var(--surface-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
