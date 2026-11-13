import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CodeBlock from "./CodeBlock";

describe("CodeBlock", () => {
  afterEach(() => {
    cleanup();
  });

  it("copies the exact code text to the clipboard", async () => {
    const user = userEvent.setup();
    const code = 'const name = "Daniel"';
    const copyFn = vi.fn().mockResolvedValue(undefined);

    render(<CodeBlock code={code} copyFn={copyFn} />);
    await user.click(screen.getByRole("button", { name: /copy code example/i }));

    expect(copyFn).toHaveBeenCalledWith(code);
    expect(await screen.findByText("Copied!")).toBeTruthy();
    expect(screen.getByText("Code copied to clipboard")).toBeTruthy();
  });

  it("shows a failure status when clipboard write fails", async () => {
    const user = userEvent.setup();
    const copyFn = vi.fn().mockRejectedValue(new Error("Permission denied"));

    render(<CodeBlock code="let score = 0" copyFn={copyFn} />);
    await user.click(screen.getByRole("button", { name: /copy code example/i }));

    expect(await screen.findByText("Copy failed")).toBeTruthy();
    expect(screen.getByText("Could not copy code")).toBeTruthy();
  });
});
