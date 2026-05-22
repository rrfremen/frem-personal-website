import { useLanguage } from "@/context/LanguageContext";
import { useApi } from "@/hooks/useApi";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";


const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface HomePageData {
    image: string,
    link_linkedin: string;
    link_github: string;
}

export default function HomePage() {
    const { t, ts } = useLanguage();
    const { data, loading, error } = useApi<HomePageData>("/web/home");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error}</p>;

    return (
        <section className="flex flex-col md:flex-row items-center gap-12 text-left px-4 md:px-0">
            {/* Photo */}
            <div className="w-[280px] md:w-[280px] shrink-0 rounded-lg overflow-hidden">
                {/* <AspectRatio ratio={410/462}> */}
                <img 
                    src={`${BASE_URL}/web/images/${data?.image}`}
                    alt="Profile picture"
                    className="w-full h-auto"
                />
                {/* </AspectRatio> */}
            </div>
            {/* Text */}
            <div className="flex flex-col gap-3 self-start">
                <h1 className="text-3xl font-medium text-black"> {ts("home.title")} </h1>
                <h2 className="text-xl font-medium text-black"> {ts("home.about_header")} </h2>
                {(t("home.about_body") as string[]).map((para, i) => (
                    <p key={i} className="text-base font-normal">{para}</p>
                ))}

                {/* Links */}
                <div className="flex gap-4 mt-6">
                    <a href={data?.link_linkedin} target="_blank" rel="noopener noreferrer"> <LinkedInIcon size={28} /> </a>
                    <a href={data?.link_github} target="_blank" rel="noopener noreferrer"> <GitHubIcon size={28} /> </a>
                </div>
            </div>
        </section>
    );
}
