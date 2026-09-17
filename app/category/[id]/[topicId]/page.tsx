import Link from "next/link";
import content from "@/data/content.json";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string }>;
}) {
  const { id, topicId } = await params;
  const category = content.find((item) => item.id === id);
  const topic = category?.topics.find((item) => item.id === topicId);

  return (
    <main>
      <Link
        href={`/category/${id}`}
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {topic?.title}
      </h1>
      <ul className="space-y-3">
        {topic?.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/category/${id}/${topicId}/${lesson.id}`}
              className="block rounded-2xl bg-white/50 p-4 font-semibold text-slate-900 shadow-md transition hover:bg-white/80"
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
