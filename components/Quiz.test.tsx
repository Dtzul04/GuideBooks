import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Quiz from "./Quiz";
import content from "@/data/content.json";

describe("Quiz", () => {
  afterEach(() => {
    cleanup();
  });

  it("lists every content category as a quiz option", () => {
    render(<Quiz />);

    for (const category of content) {
      expect(
        screen.getByRole("button", { name: category.title })
      ).toBeTruthy();
    }
  });

  it("can open a previously missing section (DevOps) and show its topics", async () => {
    const user = userEvent.setup();
    render(<Quiz />);

    await user.click(screen.getByRole("button", { name: "DevOps" }));

    expect(screen.getByText("Pick a topic:")).toBeTruthy();
    expect(screen.getByRole("button", { name: "GitHub Actions" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Docker (basics)" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Deployment" })).toBeTruthy();
  });
});
