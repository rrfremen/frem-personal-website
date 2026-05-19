import { useLanguage } from "@/context/LanguageContext";


export default function HomePage() {
    const { t } = useLanguage();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                {t("home.title")}
            </h1>
            <section id="about">
                <h2 className="text-xl font-semibold mb-2">
                    {t("home.about_heading")}
                </h2>
                <p>
                    {t("home.about_body")}
                </p>
            </section>
        </div>
    );
}
