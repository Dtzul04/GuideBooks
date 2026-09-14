import CategoryCard from "@/components/CategoryCard";
import content from "@/data/content.json";
import Quiz from "@/components/Quiz";
import Roadmap from "@/components/Roadmap";

export default function Home() {
  return (
    <main>
      <h1>Pick your playground</h1>
      {content.map((topic) => (
        <CategoryCard key={topic.id} id={topic.id} title={topic.title} />
      ))}

      <Quiz categoryId="languages" topicId="javascript" />
      <Roadmap />
    </main>
  );
}
