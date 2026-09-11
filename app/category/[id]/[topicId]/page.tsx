import Link from "next/link";
import content from "@/data/content.json";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string }>;
}) {
  const { id, topicId } = await params;
  const category = content.find((item) => item.id === id)
  const topic = category?.topics.find((item) => item.id === topicId)

  return (
    <main>
      <Link href={`/category/${id}`}>Back</Link>
      <h1>{topic?.title}</h1>
      <ul>
        {topic?.lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </main>
  );
}
