"use client";

import roadmap from "@/data/roadmap.json";
import { useState } from "react";

export default function Roadmap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = roadmap.roadmaps.find((path) => path.id === selectedId);

  return (
    <section>
      <h2>Roadmap</h2>

      {roadmap.roadmaps.map((path) => (
        <button
          key={path.id}
          type="button"
          onClick={() => setSelectedId(path.id)}
        >
          {path.title}
        </button>
      ))}

      {selected && (
        <div>
          <p>{selected.description}</p>
          {selected.stages.map((stage) => (
            <div key={stage.title}>
              <h3>
                {stage.level}: {stage.title}
              </h3>
              <ul>
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
