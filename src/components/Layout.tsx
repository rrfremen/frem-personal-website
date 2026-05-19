import { useState } from "react";
import { Outlet, NavLink} from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";


export default function Layout() {
    const { t, language, setLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:opacity-70">
                        ☰
                    </button>
                    <span className="font-semibold text-lg"> 
                        Name 
                    </span>
                </div>

                {/* langugages */}
                <div className="flex gap-2">
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

            {/* Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                <aside className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? "w-56" : "w-0 overflow-hidden"}`}>
                    <nav className="flex flex-col gap-2 px-4 mt-6">
                        <NavLink to="/" className="hover:underline"> {t("nav.home")} </NavLink>
                        <NavLink to="/cv" className="hover:underline"> {t("nav.cv")} </NavLink>
                    </nav>
                </aside>
                {/* Page content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
