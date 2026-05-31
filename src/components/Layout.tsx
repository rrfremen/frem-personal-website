import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { SideBar } from "./Sidebar";

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton";
import { toast, Toaster } from "sonner";
import ContentEditorDialog from "./ContentEditorDialog";


const PAGE_FILES: Record<string, { files: { filename: string; languageKey?: string }[] }> = {
    '/': { files: [{ filename: 'home.json' }, { filename: 'en.json', languageKey: 'home' }, { filename: 'de.json', languageKey: 'home' }] },
    '/projects': { files: [{ filename: 'projects.json' }]},
    '/cv': { files: [{ filename: 'en.json', languageKey: 'cv' }, { filename: 'de.json', languageKey: 'cv' }] },
    '/techstacks': { files: [{ filename: 'techstacks.json' }, { filename: 'en.json', languageKey: 'techstacks' }, { filename: 'de.json', languageKey: 'techstacks' }] },
    '/contact': { files: [{ filename: 'en.json', languageKey: 'contact' }, { filename: 'de.json', languageKey: 'contact' }] },
}


export default function Layout() {
    const { ts, language, setLanguage, languageLoading, languageError } = useLanguage();
    const { token } = useAuth()
    const location = useLocation()
    const[editorOpen, setEditorOpen] = useState(false)

    const currentFiles = PAGE_FILES[location.pathname]?.files ?? []

    useEffect(() => {
        if (languageError) {
            toast.error(languageError);
        }
    }, [languageError]);

    return (
        <div className="flex flex-col h-screen">
            <Toaster />

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="bg-transparent text-white"> ☰ </Button>
                        </SheetTrigger>
                        <SideBar /> 
                    </Sheet>
                    <Link to="/">
                        <span className="font-semibold text-lg"> RR </span>
                    </Link>
                </div>

                {/* languages */}
                <div className="flex gap-2">
                    {token && currentFiles.length > 0 && (
                        <Button onClick={() => setEditorOpen(true)} className="bg-transparent text-white opacity-50 hover:opacity-100">
                            Edit
                        </Button>
                    )}
                    <button
                        onClick={() => setLanguage("en")}
                        className={`px-3 py-1 rounded ${language === "en" ? "bg-white text-black" : "opacity-50"}`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage("de")}
                        className={`px-3 py-1 rounded ${language === "de" ? "bg-white text-black" : "opacity-50"}`}
                    >
                        DE
                    </button>
                </div>
            </header>

            {/* Page content */}
            <div className="flex flex-1 overflow-hidden w-full">
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {languageLoading ? (
                            <div className="flex flex-col gap-4">
                                <Skeleton className="h-8 w-1/3" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ) : languageError ? (
                            <div />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="text-center text-sm bg-gray-900 text-white py-4">
                © 2026 {ts("footer.copyright_name")} · {ts("nav.last_updated")} 31.05.2026
            </footer>

            <ContentEditorDialog
                open={editorOpen}
                onOpenChange={setEditorOpen}
                files={currentFiles}
                onSaveSuccess={() => window.location.reload()}
            />

        </div>
    )
}
