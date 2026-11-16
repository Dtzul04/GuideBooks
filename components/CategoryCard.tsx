import Link from "next/link";

/* Receives id + title, shows the title, and navigates to /category/[id] when clicked */
export default function CategoryCard({ id, title }: { id: string; title: string }) {
  return (
    <Link
      href={`/category/${id}`}
      className="block rounded-xl border border-slate-200/70 bg-[var(--surface)] p-4 shadow-sm backdrop-blur-md transition duration-200 hover:border-sky-300 hover:bg-[var(--surface-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
    >
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    </Link>
  );
}
