import Link from "next/link";

/* Receives id + title, shows the title, and navigates to /category/[id] when clicked */
export default function CategoryCard({ id, title }: { id: string; title: string }) {
    return (
        <Link href={`/category/${id}`}>
            <div className="rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300 p-4">
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            </div>
        </Link>
    )
}
