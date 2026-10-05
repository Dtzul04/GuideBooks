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
      <h2 className="mb-3 text-2xl font-bold text-slate-900">Roadmap</h2>

      {/* Clicking it selects that path, and the selected one is highlighted */}
      <div className="flex flex-wrap gap-2">
        {roadmap.roadmaps.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelectedId(path.id)}
            className={
              selectedId === path.id
                ? "rounded-xl bg-white/70 backdrop-blur-md border border-white/60 px-4 py-3 font-semibold text-slate-900 shadow-lg ring-2 ring-sky-500 transition duration-300 cursor-pointer"
                : "rounded-xl bg-white/40 backdrop-blur-md border border-white/60 px-4 py-3 font-semibold text-slate-900 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300 cursor-pointer"
            }
          >
            {path.title}
          </button>
        ))}
      </div>

      {/* Only shown once a path is picked: its description, then one card per stage */}
      {selected && (
        <div className="mt-4 text-slate-800">
          <p>{selected.description}</p>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {selected.stages.map((stage) => (
              <div
                key={stage.title}
                className="rounded-xl bg-white/40 p-4 backdrop-blur-md border border-white/60 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {stage.level}: {stage.title}
                </h3>
                {/* Topics to learn in this stage */}
                <ul className="list-disc space-y-1 pl-5">
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
