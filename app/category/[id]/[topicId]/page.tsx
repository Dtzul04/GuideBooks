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
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {topic?.title}
      </h1>
      {/* One link per lesson, going to /category/[id]/[topicId]/[lessonId] */}
      <ul className="space-y-3">
        {topic?.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/category/${id}/${topicId}/${lesson.id}`}
              className="block rounded-xl bg-white/40 backdrop-blur-md border border-white/60 p-4 font-semibold text-slate-900 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300"
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
