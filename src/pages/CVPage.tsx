import ExperienceCard from "@/components/ExperienceCard";
import FormalEducationCard from "@/components/FormalEducationCard";
import { useLanguage } from "@/context/LanguageContext";
import { Separator } from "@/components/ui/separator";


interface FormalEducation {
    title: string;
    institution: string;
    date: string;
    thesis: string;
    thesis_desc: string;
}

interface Experience {
    title: string;
    company: string;
    place: string;
    date: string;
    bullets: string[];
}

export default function CVPage() {
    const { t, ts } = useLanguage();
    
    const formalEducations = t("cv.formal_educations") as FormalEducation[]
    const experiences = t("cv.practical_experiences") as Experience[]
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">{ts("cv.formal_education")}</h1>
            {Array.isArray(formalEducations) && formalEducations.map((exp, i) => (
                <FormalEducationCard key={i} formalEducation={exp} />
            ))}
            <Separator />
            <h1 className="mt-8 text-3xl font-bold mb-8">{ts("cv.practical_experience")}</h1>
            {Array.isArray(experiences) && experiences.map((exp, i) => (
                <ExperienceCard key={i} experience={exp} />
            ))}
            <Separator />
            <p className="mt-8 text-sm text-gray-500 italic">
                {ts("cv.disclaimer")}
            </p>
        </div>
    )
}
