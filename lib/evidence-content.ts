// "Evidence — Programmes we've delivered" content, verbatim from the
// openfoundry.app/preview/vcuinternational-owjd2j page (4 case-study cards).

export interface EvidenceCard {
  image: string;
  pdf: string;
  kpiBadge: string;
  tags: string[];
  title: string;
  summary: string;
  bullets: string[];
}

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    image: "/images/process/stamping-1.jpg",
    pdf: "Stamping.pdf",
    kpiBadge: "<350 PPM defect rate",
    tags: ["Industrial", "High-volume"],
    title: "High-volume stamped enclosure programme",
    summary:
      "Progressive-die stamped sheet-metal enclosures and brackets for industrial control assemblies, run on automated press lines with in-process dimensional checks.",
    bullets: [
      "Progressive die — blanking, piercing and drawing in one stroke",
      "Carbon and stainless steel, 0.8 – 3.0 mm thickness",
      "First-off + SPC sampling on critical features",
    ],
  },
  {
    image: "/images/process/powder-metallurgy-4.jpg",
    pdf: "PowderMetallurgy.pdf",
    kpiBadge: "±0.05 mm tolerance",
    tags: ["Automotive", "Drivetrain"],
    title: "Near-net-shape sintered gear components",
    summary:
      "Sintered iron and stainless gears, sprockets and bearing components produced near-net-shape for high-volume drivetrain and small-motor assemblies.",
    bullets: [
      "Iron-copper and sintered stainless alloys",
      "Near-net-shape — minimal post-machining required",
      "Density verification + dimensional sampling per batch",
    ],
  },
  {
    image: "/images/capabilities/casting.jpg",
    pdf: "InvestmentCasting.pdf",
    kpiBadge: "100% CMM verified",
    tags: ["Industrial", "Valves & flow"],
    title: "Stainless investment-cast valve bodies",
    summary:
      "316L and CF8M stainless investment castings for industrial valve and pump bodies with complex internal geometries — finished to ASTM dimensional standards.",
    bullets: [
      "316L / CF8M stainless, parts up to 8 kg",
      "Wax-pattern through to post-cast machining",
      "Dye-penetrant + dimensional inspection on every lot",
    ],
  },
  {
    image: "/images/process/aluminum-extrusion-5.jpg",
    pdf: "InjectionMolding.pdf",
    kpiBadge: "98.4% on-time",
    tags: ["Industrial", "Pumps & valves"],
    title: "Iron pump-housing casting programme",
    summary:
      "Medium-weight ductile iron and grey iron housings for industrial pump and valve assemblies — sand-cast in-house, finished with downstream machining to drawing tolerance.",
    bullets: [
      "5 – 80 kg per part, ductile iron / grey iron",
      "Pattern through to first-article inspection in-house",
      "Post-cast machining and dye-penetrant inspection",
    ],
  },
];
