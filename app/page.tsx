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

      {/* Practice props — change these later when a real lesson is selected */}
      <Quiz
        categoryId="languages"
        topicId="javascript"
        lessonId="variables"
      />
      <Roadmap />
    </main>
  );
}
