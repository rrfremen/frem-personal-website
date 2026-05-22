interface Experience {
    title: string;
    company: string;
    place: string;
    date: string;
    bullets: string[];
}


interface Props {
    experience: Experience;
}


export default function ExperienceCard({ experience }: Props) {
    const { title, company, place, date, bullets } = experience;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-xl text-gray-400">{company} · {place} · {date}</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
                {bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                ))}
            </ul>
        </div>
    )
}
