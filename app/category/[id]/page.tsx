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
      {/* Back to the home page */}
      <Link
        href="/"
        className="mb-3 inline-block text-slate-700 underline hover:text-slate-900"
      >
        Back
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        {category.title}
      </h1>
      {/* One link per topic, going to /category/[id]/[topicId] */}
      <ul className="space-y-3">
        {category.topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/category/${id}/${topic.id}`}
              className="block rounded-xl bg-white/40 backdrop-blur-md border border-white/60 p-4 font-semibold text-slate-900 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
