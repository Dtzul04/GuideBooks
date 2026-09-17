import CategoryCard from "@/components/CategoryCard";
import content from "@/data/content.json";

export default function Home() {
  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
        Pick your playground
      </h1>
      {content.map((topic) => (
        <CategoryCard key={topic.id} id={topic.id} title={topic.title} />
      ))}
    </main>
  );
}
