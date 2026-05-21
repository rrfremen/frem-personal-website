import { useLanguage } from "@/context/LanguageContext";
import { useApi } from "@/hooks/useApi";


interface HomePageData {
    name: string;
    city: string;
}

export default function HomePage() {
    const { t } = useLanguage();
    const { data, loading, error } = useApi<HomePageData>("/web/home");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">
                {t("home.title")}
            </h1>
            <section id="about">
                <h2 className="text-xl font-semibold mb-2">
                    {t("home.about-header")}
                </h2>
                <p>
                    {t("home.about-body")}
                </p>
                <p>{data?.name} - {data?.city}</p>
            </section>
        </div>
    );
}
