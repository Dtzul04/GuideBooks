import Link from "next/link";

export default function CategoryCard({ id, title }: { id: string; title: string }) {
    return (
        <Link href={`/category/${id}`}>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}
