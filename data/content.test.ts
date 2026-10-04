import { describe, it, expect } from "vitest";
import content from "./content.json";

describe("content.json",  () => {
    it("is a non-empty array", () => {
        expect(Array.isArray(content)).toBe(true);
        expect(content.length).toBeGreaterThan(0);
    });

    it("category ids are unique", () => {
        const ids = content.map((c) => c.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("every category has id, title, and topics", () => {
        for (const category of content) {
            expect(category.id).toBeTruthy();
            expect(category.title).toBeTruthy();
            expect(Array.isArray(category.topics)).toBe(true);
        }
    });

    it("topic and lesson ids are unique and lessons have required fields", () => {
        for (const category of content) {
          const topicIds = category.topics.map((t) => t.id);
          expect(new Set(topicIds).size).toBe(topicIds.length);

          for (const topic of category.topics) {
            expect(topic.id).toBeTruthy();
            expect(topic.title).toBeTruthy();
            expect(Array.isArray(topic.lessons)).toBe(true);

            const lessonIds = topic.lessons.map((l) => l.id);
            expect(new Set(lessonIds).size).toBe(lessonIds.length);

            for (const lesson of topic.lessons) {
              expect(lesson.id).toBeTruthy();
              expect(lesson.title).toBeTruthy();
            }
          }
        }
      });    
});