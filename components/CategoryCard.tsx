import Link from "next/link";

export default function CategoryCard({ id, title }: { id: string; title: string }) {
    return (
        <Link href={`/category/${id}`}>
            <div className="rounded-2xl bg-white/50 p-4 mb-3 shadow-md hover:bg-white/80 transition">
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            </div>
        </Link>
    )
}
