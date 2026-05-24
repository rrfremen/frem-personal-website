import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";


interface TechLink {
    label: string;
    url: string;
}


interface TechBadgeProps {
    name: string;
    description?: string;
    links?: TechLink[];
}


export default function TechBadge({ name, description, links }: TechBadgeProps) {
    const [ open, setOpen ] = useState(false);
    const clickable =!!description

    return (
        <>
            <button onClick={() => clickable && setOpen(true)} className={`text-sm px-3 py-1 rounded-full bg-muted transition-colors ${clickable ? "hover:bg-muted-foreground/20 cursor-pointer" : "cursor-default opacity-70"}`}>
                {name}
            </button>

            {clickable && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{name}</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-muted-foreground">{description}</p>
                        {links && links.length > 0 && (
                            <div className="flex flex-col gap-2 mt-2">
                                {links.map(link => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm underline hover:text-foreground"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
