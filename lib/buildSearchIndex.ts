import content from "@/data/content.json";

// One row in the search list — used when the user types in the search box
export type SearchItem = {
  type: "topic" | "lesson";
  title: string; // what we match against
  href: string; // same links as the rest of the app
  breadcrumb: string; // e.g. Languages > JavaScript > Variables
};

// Turn nested content.json into a flat list (built once, then filtered while typing)
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const category of content) {
    for (const topic of category.topics) {
      // Topic page link
      items.push({
        type: "topic",
        title: topic.title,
        href: `/category/${category.id}/${topic.id}`,
        breadcrumb: `${category.title} > ${topic.title}`,
      });

      // Lesson links under this topic
      for (const lesson of topic.lessons) {
        items.push({
          type: "lesson",
          title: lesson.title,
          href: `/category/${category.id}/${topic.id}/${lesson.id}`,
          breadcrumb: `${category.title} > ${topic.title} > ${lesson.title}`,
        });
      }
    }
  }

  return items;
}
