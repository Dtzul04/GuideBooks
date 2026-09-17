import Link from "next/link";
import content from "@/data/content.json";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = content.find((item) => item.id === id);

  if (!category) {
    return (
      <main>
        <Link
          href="/"
          className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
        >
          Back
        </Link>
        <p>Category not found</p>
      </main>
    );
  }

  return (
    <main>
      <Link
        href="/"
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {category.title}
      </h1>
      <ul className="space-y-3">
        {category.topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/category/${id}/${topic.id}`}
              className="block rounded-2xl bg-white/50 p-4 font-semibold text-slate-900 shadow-md transition hover:bg-white/80"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
