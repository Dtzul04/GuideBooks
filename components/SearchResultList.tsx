import Link from "next/link";
import type { SearchItem } from "@/lib/buildSearchIndex";

const resultLinkClass =
  "block rounded-xl bg-white/40 backdrop-blur-md border border-white/60 p-4 font-semibold text-slate-900 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300";

// Shows match cards (or empty message) — no state here
export default function SearchResultList({ results }: { results: SearchItem[] }) {
  if (results.length === 0) {
    return (
      <p className="mt-3 rounded-xl border border-white/60 bg-white/40 px-4 py-3 text-slate-700 backdrop-blur-md">
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
