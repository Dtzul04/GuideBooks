"use client";

import { useEffect, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

type CodeBlockProps = {
  code: string;
  // Optional so tests can fake the clipboard without fighting jsdom
  copyFn?: (text: string) => Promise<void>;
};

// client-only because clipboard needs the browser
export default function CodeBlock({ code, copyFn }: CodeBlockProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  // After success/failure, return to idle so the button label resets
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function handleCopy() {
    const copy = copyFn ?? ((text: string) => navigator.clipboard.writeText(text));
    try {
      await copy(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const buttonLabel =
    status === "copied" ? "Copied!" : status === "failed" ? "Copy failed" : "Copy";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code example"
        className="absolute top-2 right-2 z-10 rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-sky-100 backdrop-blur-sm hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        {buttonLabel}
      </button>
      <pre className="overflow-x-auto rounded-2xl bg-slate-900/90 p-4 pt-12 text-sm text-sky-100 shadow-md">
        {code}
      </pre>
      <p className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Code copied to clipboard"
          : status === "failed"
            ? "Could not copy code"
            : ""}
      </p>
    </div>
  );
}
