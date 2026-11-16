"use client";

import { useMemo, useState } from "react";
import { buildSearchIndex } from "@/lib/buildSearchIndex";
import { filterSearchIndex } from "@/lib/filterSearchIndex";
import SearchResultList from "@/components/SearchResultList";

// Search box on the home page — state + input only; filter and list live elsewhere
export default function ContentSearch() {
  const index = useMemo(() => buildSearchIndex(), []);
  const [searchText, setSearchText] = useState("");
  const results = filterSearchIndex(index, searchText);
  const showResults = searchText.trim().length > 0;

  return (
    <section className="mb-6" aria-label="Search learning content">
      <label
        htmlFor="content-search"
        className="mb-2 block text-sm font-medium text-slate-600"
      >
        Search topics and lessons
      </label>
      <input
        id="content-search"
        type="search"
        placeholder="e.g. async, git, react…"
        className="w-full rounded-xl border border-slate-200/70 bg-[var(--surface)] px-4 py-3 text-slate-900 shadow-sm backdrop-blur-md placeholder:text-slate-500 transition duration-200 hover:border-sky-300 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {showResults && <SearchResultList results={results} />}
    </section>
  );
}
