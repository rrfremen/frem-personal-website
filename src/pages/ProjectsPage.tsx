import { useApi } from "@/hooks/useApi";
import ProjectCard from "@/components/ProjectCard";

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

export default function ProjectsPage() {
    const { data, loading, error } = useApi<Project[]>("/web/projects");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap gap-8 items-start justify-center">
            {data?.map(project => (
                <ProjectCard key={project.title} {...project} />
            ))}
        </div>
    );
}