import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TAG_LIMIT = 4
const STATUS_CONFIG = {
    "live":         { label: "Live", color: "bg-green-500 animate-pulse" },
    "in-progress":  { label: "In Progress", color: "bg-yellow-400" },
    "archived":     { label: "Archived", color: "bg-gray-400" }
}

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    status: "live" | "in-progress" | "archived";
}


export default function ProjectCard({ title, description, image, tags, link, status }: Project) {
    const [open, setOpen] = useState(false)
    const isLongTags = tags.length > TAG_LIMIT
    const visibleTags = isLongTags ? tags.slice(0, TAG_LIMIT) : tags
    const { label, color } = STATUS_CONFIG[status]

    return (
        <>
            <Card className="max-w-sm">
                <img
                    src={`${BASE_URL}/web/images/${image}`}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    <div className="relative">
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                        <button
                            onClick={() => setOpen(true)}
                            className="text-sm underline hover:text-foreground"
                        >
                            ...more
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {visibleTags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted">{tag}</span>
                        ))}
                        {isLongTags && (
                            <button
                                onClick={() => setOpen(true)}
                                className="text-xs underline hover:text-foreground"
                            >
                                ...more
                            </button>
                        )}
                    </div>
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                            {link}
                        </a>
                    )}
                </CardContent>

                <div className="px-6 pb-2 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                </div>

            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted">{tag}</span>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
