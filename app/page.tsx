import CategoryCard from "@/components/CategoryCard";
import content from "@/data/content.json";
import ContentSearch from "@/components/ContentSearch";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Pick your playground
      </h1>
      <p className="mt-2 mb-6 text-sm text-slate-600 md:text-base">
        Browse a category to start learning.
      </p>

      <ContentSearch />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {/* Loop each topic and render one CategoryCard */}
        {content.map((topic) => (
          <CategoryCard key={topic.id} id={topic.id} title={topic.title} />
        ))}
      </div>
    </main>
  );
}
