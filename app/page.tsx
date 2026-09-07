import CategoryCard from "@/components/CategoryCard";

export default function Home() {
    return (
        <main>
            <h1>Pick your playground</h1>
            <CategoryCard title="Languages" />
            <CategoryCard title="Frameworks" />
            <CategoryCard title="Tools" />
            <CategoryCard title="AI & APIs" />
            <CategoryCard title="Concepts" />
            <CategoryCard title="DevOps" />
            <CategoryCard title="Databases" />
        </main>
    )
}