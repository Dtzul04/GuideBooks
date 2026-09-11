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
            <Link href="/">Back</Link>
            <p>Category not found</p>
        </main>
    );
  }

  return (
    <main>
      <Link href="/">Back</Link>
      <h1>{category.title}</h1>
      <ul>
        {category.topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/category/${id}/${topic.id}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
