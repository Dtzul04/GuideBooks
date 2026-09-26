import Link from "next/link";

/* Receives id + title, shows the title, and navigates to /category/[id] when clicked */
export default function CategoryCard({ id, title }: { id: string; title: string }) {
    return (
        <Link href={`/category/${id}`}>
            <div className="bg-sky-200 rounded-xl border border-sky-400/50 hover:shadow-lg p-4">
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            </div>
        </Link>
    )
}
