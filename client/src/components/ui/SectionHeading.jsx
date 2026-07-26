export default function SectionHeading({ eyebrow, title, description, centered = true }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-pretty text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}
