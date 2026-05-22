import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TAG_LIMIT = 4

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}


export default function ProjectCard({ title, description, image, tags, link }: Project) {
    const [open, setOpen] = useState(false)
    const isLongTags = tags.length > TAG_LIMIT
    const visibleTags = isLongTags ? tags.slice(0, TAG_LIMIT) : tags

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
