import Link from "next/link";
import type { SearchItem } from "@/lib/buildSearchIndex";

const resultLinkClass =
  "block rounded-xl border border-slate-200/70 bg-[var(--surface)] p-4 font-semibold text-slate-900 shadow-sm backdrop-blur-md transition duration-200 hover:border-sky-300 hover:bg-[var(--surface-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2";

// Shows match cards (or empty message) — no state here
export default function SearchResultList({ results }: { results: SearchItem[] }) {
  if (results.length === 0) {
    return (
      <p className="mt-3 rounded-xl border border-slate-200/70 bg-[var(--surface)] px-4 py-3 text-sm text-slate-600 backdrop-blur-md">
        No topics or lessons found.
      </p>
    );
  }

  return (
    <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto">
      {results.map((item) => (
        <li key={`${item.type}-${item.href}`}>
          <Link href={item.href} className={resultLinkClass}>
            <span className="block">{item.title}</span>
            <span className="mt-1 block text-sm font-normal text-slate-700">
              {item.breadcrumb}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
