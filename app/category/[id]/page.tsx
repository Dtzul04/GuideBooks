import Link from "next/link";
import content from "@/data/content.json";

// Lists the topics in one category (e.g. /category/languages)
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Read the category id from the URL, then find that category in content.json
  const { id } = await params;
  const category = content.find((item) => item.id === id);

  // No category matches the id in the URL
  if (!category) {
    return (
      <main>
        <Link
          href="/"
          className="mb-3 inline-block text-sm font-medium text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Back
        </Link>
        <p>Category not found</p>
      </main>
    );
  }

  return (
    <main>
      {/* Back to the home page */}
      <Link
        href="/"
        className="mb-3 inline-block text-sm font-medium text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {category.title}
      </h1>
      {/* One link per topic, going to /category/[id]/[topicId] */}
      <ul className="space-y-3">
        {category.topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/category/${id}/${topic.id}`}
              className="block rounded-xl border border-slate-200/70 bg-[var(--surface)] p-4 font-semibold text-slate-900 shadow-sm backdrop-blur-md transition duration-200 hover:border-sky-300 hover:bg-[var(--surface-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
