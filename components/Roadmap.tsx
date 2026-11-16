"use client";

import roadmap from "@/data/roadmap.json";
import { useState } from "react";

// Pick a path to see its stages and topics
export default function Roadmap() {
  // Which path is picked and that path's full data from roadmap.json
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = roadmap.roadmaps.find((path) => path.id === selectedId);

  return (
    <section>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">Roadmap</h2>
      <p className="mb-3 text-sm text-slate-600">Choose a path to see the stages.</p>

      {/* Clicking it selects that path, and the selected one is highlighted */}
      <div className="flex flex-wrap gap-2">
        {roadmap.roadmaps.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelectedId(path.id)}
            className={
              selectedId === path.id
                ? "cursor-pointer rounded-xl border border-sky-400 bg-[var(--surface-hover)] px-4 py-3 font-semibold text-slate-900 shadow-md backdrop-blur-md ring-2 ring-sky-500 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                : "cursor-pointer rounded-xl border border-slate-200/70 bg-[var(--surface)] px-4 py-3 font-semibold text-slate-900 shadow-sm backdrop-blur-md transition duration-200 hover:border-sky-300 hover:bg-[var(--surface-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            }
          >
            {path.title}
          </button>
        ))}
      </div>

      {/* Only shown once a path is picked: its description, then one card per stage */}
      {selected && (
        <div className="mt-4 text-slate-800">
          <p className="text-sm leading-relaxed text-slate-700 md:text-base">
            {selected.description}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {selected.stages.map((stage) => (
              <div
                key={stage.title}
                className="rounded-xl border border-slate-200/70 bg-[var(--surface)] p-4 shadow-sm backdrop-blur-md"
              >
                <h3 className="mb-2 text-base font-bold text-slate-900 md:text-lg">
                  <span className="text-sky-700">{stage.level}</span>
                  <span className="text-slate-400"> · </span>
                  {stage.title}
                </h3>
                {/* Topics to learn in this stage */}
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                  {stage.topics.map((topic) => (
                    <li key={topic.name}>{topic.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
