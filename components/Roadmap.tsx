"use client";

import roadmap from "@/data/roadmap.json";
import { useState } from "react";

export default function Roadmap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = roadmap.roadmaps.find((path) => path.id === selectedId);

  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-slate-900">Roadmap</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {roadmap.roadmaps.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelectedId(path.id)}
            className={
              selectedId === path.id
                ? "rounded-2xl bg-sky-300/80 px-4 py-3 font-semibold text-slate-900 shadow-md ring-2 ring-sky-500"
                : "rounded-2xl bg-white/50 px-4 py-3 font-semibold text-slate-900 shadow-md hover:bg-white/80 transition"
            }            
          >
            {path.title}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 text-slate-800">
          <p className="mb-4">{selected.description}</p>
          {selected.stages.map((stage) => (
            <div key={stage.title} className="mb-4 rounded-2xl bg-white/40 p-4">
              <h3 className="mb-2 text-lg font-bold">
                {stage.level}: {stage.title}
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                {stage.topics.map((topic) => (
                  <li key={topic.name}>{topic.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
