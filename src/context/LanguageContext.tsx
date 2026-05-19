import { createContext, useState, useContext } from "react";
import en from "../languages/en.json";
import de from "../languages/de.json";


const languages = { en, de };
export type Language = keyof typeof languages

interface LanguageContextType {
    language: Language;
    t: (path: string) => string;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    function t(path: string): string {
        const keys = path.split(".");
        let current: unknown = languages[language];
        for (const key of keys) {
            if (typeof current !== "object" || current === null) return path;
            current = (current as Record<string, unknown>)[key];
        }
        return typeof current === "string" ? current : path;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
}
