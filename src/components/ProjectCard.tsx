import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

export default function ProjectCard({ title, description, image, tags, link }: Project) {
    return (
        <Card>
            <img
                src={`${BASE_URL}/web/images/${image}`}
                alt={title}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted">{tag}</span>
                    ))}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                    {link}
                </a>
            </CardContent>
        </Card>
    );
}
