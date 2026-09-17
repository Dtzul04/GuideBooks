import Link from "next/link";
import content from "@/data/content.json";
import TopicContent from "@/components/TopicContent";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string; lessonId: string }>;
}) {
  const { id, topicId, lessonId } = await params;
  const category = content.find((item) => item.id === id);
  const topic = category?.topics.find((item) => item.id === topicId);
  const lesson = topic?.lessons.find((item) => item.id === lessonId);

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
      <Link
        href={`/category/${id}/${topicId}`}
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {lesson.title}
      </h1>
      <TopicContent
        title={lesson.title}
        summary={lesson.summary}
        example={lesson.example}
      />
    </main>
  );
}
