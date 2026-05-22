import { createContext, useState, useContext, useEffect } from "react";
import en from "../languages/en.json";
import de from "../languages/de.json";
import { apiFetch } from "@/services/api";


const languages = { en, de };
export type Language = keyof typeof languages

function deepMerge(base: Record<string, unknown>, remote: Record<string, unknown>): Record<string, unknown> {
    const result = { ...base };
    for (const key in remote) {
        if (typeof remote[key] === "object" && !Array.isArray(remote[key]) && remote[key] !== null){
            result[key] = deepMerge((base[key] ?? {}) as Record<string, unknown>, remote[key] as Record<string, unknown>);
        } else {
            result[key] = remote[key]
        }
    }
    return result;
}

interface LanguageContextType {
    language: Language;
    t: (path: string) => unknown;
    ts: (path: string) => string;
    setLanguage: (language: Language) => void;
    languageLoading: boolean;
    languageError: string | null;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [merged, setMerged] = useState<Record<string, unknown>>(languages[language] as Record<string, unknown>);
    const [languageLoaded, setLanguageLoaded] = useState(false);
    const [languageLoading, setLanguageLoading] = useState(true);
    const [languageError, setLanguageError] = useState<string | null>(null);

    useEffect(() => {
        if (languageLoaded) return; // already fetched for this language, skip
        setLanguageLoading(true);
        setLanguageError(null);
        setMerged(languages[language] as Record<string, unknown>);
        apiFetch<Record<string, unknown>>(`/web/language/${language}`)
            .then(remote => {
                setMerged(deepMerge(languages[language] as Record<string, unknown>, remote));
                setLanguageLoaded(true);
                setLanguageLoading(false);
            })
            .catch(err => {
                setLanguageError(err.message);
                setLanguageLoading(false);
            });
    }, [languageLoaded, language]);

    function handleSetLanguage(lang: Language) {
        setLanguage(lang);
        setLanguageLoaded(false);
    }

    function t(path: string): unknown {
        const keys = path.split(".");
        let current: unknown = merged;
        for (const key of keys) {
            if (typeof current !== "object" || current === null) return path;
            current = (current as Record<string, unknown>)[key];
        }
        return current ?? path;
    }

    function ts(path: string): string {
        const result = t(path);
        return typeof result === "string" ? result : path;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, ts, languageLoading, languageError }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
}
