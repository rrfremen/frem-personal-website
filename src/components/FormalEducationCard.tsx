interface FormalEducation {
    title: string;
    institution: string;
    date: string;
    thesis: string;
    thesis_desc: string;
}


interface Props {
    formalEducation: FormalEducation
}


export default function FormalEducationCard({ formalEducation }: Props) {
  const { title, institution, date, thesis, thesis_desc } = formalEducation

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl text-gray-400">{institution} · {date}</p>
      {thesis && (
        <div className="mt-2">
          <span className="font-semibold">{thesis}: </span>
          <span>{thesis_desc}</span>
        </div>
      )}
    </div>
  )
}
