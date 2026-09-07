export default function CategoryCard({ title }: {title: string}) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    )
}