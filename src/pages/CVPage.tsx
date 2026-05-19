import { useLanguage } from "@/context/LanguageContext";


export default function CVPage() {
    const { t } = useLanguage();
    
    return (
        <div>
            <h1 className="text-xl font-bold mb-8">
                hello
            </h1>
            <section id="uni">
                <h2 className="text-l font-semibold mb-2">
                    {t("cv.uni")}
                </h2>
            </section>
        </div>
    )
}
