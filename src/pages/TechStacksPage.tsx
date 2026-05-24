import { useApi } from "@/hooks/useApi";
import { useLanguage } from "@/context/LanguageContext";
import TechBadge from "@/components/TechBadge";
import { Separator } from "@/components/ui/separator";


interface TechLink {
    label: string;
    url: string;
}

interface Tech {
    key: string;
    name: string;
    links?: TechLink[];
}

type TechGroup = Record<string, Tech[]>;


export default function TechStacksPage() {
    const { data, loading, error } = useApi<{ groups: TechGroup[] }>("/web/techstacks");
    const { t, ts } = useLanguage();

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="flex flex-col gap-10">
            <p className="mt-8 text-sm text-gray-500">
                {ts("techstacks.desc")}
            </p>

            {data?.groups.map((group, i) => {
                const groupKey = Object.keys(group)[0];
                const techs = group[groupKey];
                const groupLabel = ts(`techstacks.${groupKey}.name`);
 
                return (
                    <section key={i} className="flex flex-col gap-4">
                        <Separator />
                        <h2 className="text-lg font-semibold">{groupLabel}</h2>
                        <div className="flex flex-wrap gap-2">
                            {techs.map(tech => {
                                const description = t(`techstacks.${groupKey}.${tech.key}`);
                                return (
                                    <TechBadge
                                        key={tech.key}
                                        name={tech.name}
                                        description={typeof description === "string" && description !== `techstacks.${groupKey}.${tech.key}` ? description : undefined}
                                        links={tech.links}
                                    />
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
    );

}
