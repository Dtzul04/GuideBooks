// Ensures every content category has quiz options, and quiz keys match content ids.
import { describe, it, expect } from "vitest";
import content from "./content.json";
import quizData from "./quiz.json";

describe("quiz.json sections", () => {
  const quiz = quizData.quiz as Record<string, unknown>;
  const contentIds = content.map((category) => category.id);
  const quizIds = Object.keys(quiz);

  it("includes a quiz section for every content category", () => {
    expect(quizIds.length).toBeGreaterThan(0);

    for (const id of contentIds) {
      expect(quizIds, `missing quiz section for content category "${id}"`).toContain(
        id
      );
    }
  });

  it("does not keep the old mismatched section ids", () => {
    // Previously these keys meant AI & APIs / Databases never lined up with content.json
    expect(quizIds).not.toContain("ai-apis");
    expect(quizIds).not.toContain("database");
  });

  it("uses the aligned section ids that were previously omitted or mismatched", () => {
    expect(quizIds).toContain("ai-and-apis");
    expect(quizIds).toContain("databases");
    expect(quizIds).toContain("devops");
  });

  it("only uses category ids that exist in content.json", () => {
    for (const id of quizIds) {
      expect(contentIds, `quiz section "${id}" is not in content.json`).toContain(
        id
      );
    }
  });
});
