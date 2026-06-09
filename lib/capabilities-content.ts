// Capability accordion content — the 10-item "What we do" list mirroring the
// openfoundry.app/preview/vcuinternational-owjd2j page.
//
// `summary`, `tolerances` and `materials` are verbatim from the preview's
// rendered list. The preview generates `processScope`, `inspection`,
// `productionScale` and `applications` from per-category templates in its own
// client bundle (not exposed in the page payload), so those are reconstructed
// here per category and kept consistent with the one fully-expanded card
// (Precision Machining). Every value carries the preview's "*" provenance marker
// via the footnote shown in the UI.
//
// Each capability uses a distinct local category-specific photo for visual
// variety (the preview reuses a 3-photo pool; we prefer one image per item).

export interface CapabilityItem {
  name: string;
  image: string;
  summary: string;
  processScope: string;
  materials: string;
  tolerances: string;
  inspection: string;
  productionScale: string;
  applications: string[];
}

const PROCESS_SCOPE = "Prototype → pilot → volume";
const PRODUCTION_SCALE = "100 – 100,000+ parts / year";

export const CAPABILITY_ITEMS: CapabilityItem[] = [
  {
    name: "Precision Machining",
    image: "/images/capabilities/cnc-machining.jpg",
    summary:
      "Precision machining across a documented envelope, with in-process inspection and material traceability.",
    processScope: PROCESS_SCOPE,
    materials: "Aluminium, stainless, brass, specialty alloys",
    tolerances: "±0.01 mm typical",
    inspection: "CMM + in-process dimensional",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Precision housings and brackets",
      "Medical instrument components",
      "Aerospace structural mounts",
    ],
  },
  {
    name: "Casting",
    image: "/images/capabilities/casting.jpg",
    summary:
      "Casting route with tooling oversight, downstream machining and inspection in sequence.",
    processScope: PROCESS_SCOPE,
    materials: "Aluminium, ferrous alloys, copper alloys",
    tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining",
    inspection: "Dimensional + dye-penetrant per lot",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Pump and valve bodies",
      "Structural housings",
      "Complex near-net geometries",
    ],
  },
  {
    name: "Sheet Metal Fabrication",
    image: "/images/capabilities/sheet-metal-fabrication.jpg",
    summary: "Formed and fabricated parts with downstream finishing support.",
    processScope: PROCESS_SCOPE,
    materials: "Mild steel, stainless, aluminium",
    tolerances: "±0.1 mm",
    inspection: "First-off + in-process dimensional",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Enclosures and brackets",
      "Chassis and panels",
      "Fabricated assemblies",
    ],
  },
  {
    name: "Welding & Assembly",
    image: "/images/capabilities/welding-assembly.jpg",
    summary:
      "Welding and assembly with documented procedure specs and inspection aligned to OEM expectations.",
    processScope: PROCESS_SCOPE,
    materials: "Carbon steel, stainless, aluminium",
    tolerances: "Assembly stack per drawing",
    inspection: "Visual + dimensional per WPS",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Multi-part weldments",
      "Fabricated sub-assemblies",
      "Structural frames",
    ],
  },
  {
    name: "Investment Casting",
    image: "/images/process/aluminum-extrusion-4.jpg",
    summary:
      "Casting route with tooling oversight, downstream machining and inspection in sequence.",
    processScope: PROCESS_SCOPE,
    materials: "Aluminium, ferrous alloys, copper alloys",
    tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining",
    inspection: "Dye-penetrant + dimensional per lot",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Stainless valve bodies",
      "Complex internal geometries",
      "Near-net structural parts",
    ],
  },
  {
    name: "Sand Casting",
    image: "/images/process/powder-metallurgy-4.jpg",
    summary:
      "Casting route with tooling oversight, downstream machining and inspection in sequence.",
    processScope: PROCESS_SCOPE,
    materials: "Ductile iron, grey iron, aluminium",
    tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining",
    inspection: "Dimensional + dye-penetrant per lot",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Medium-to-large iron parts",
      "Pump and valve housings",
      "Structural castings",
    ],
  },
  {
    name: "Die Casting",
    image: "/images/process/aluminum-extrusion-5.jpg",
    summary:
      "Casting route with tooling oversight, downstream machining and inspection in sequence.",
    processScope: PROCESS_SCOPE,
    materials: "Aluminium, zinc alloys",
    tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining",
    inspection: "Dimensional + porosity check per lot",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "High-volume housings",
      "Thin-wall components",
      "Heat-sink and bracket parts",
    ],
  },
  {
    name: "Stamping",
    image: "/images/process/stamping-1.jpg",
    summary:
      "Metal stamping with progressive-die capability and in-line inspection at production volume.",
    processScope: PROCESS_SCOPE,
    materials: "Carbon steel, stainless, aluminium",
    tolerances: "±0.05 mm",
    inspection: "First-off + SPC sampling",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Brackets and clips",
      "Stamped enclosures",
      "High-volume components",
    ],
  },
  {
    name: "Laser Cutting",
    image: "/stock-heroes/sheet-metal-2.jpg",
    summary:
      "Laser Cutting handled with process controls, documentation and inspection evidence engineers need to qualify the part.",
    processScope: PROCESS_SCOPE,
    materials: "Mild steel, stainless, aluminium",
    tolerances: "±0.1 mm",
    inspection: "Profile + dimensional check",
    productionScale: PRODUCTION_SCALE,
    applications: ["Profiles and blanks", "Brackets", "Flat components"],
  },
  {
    name: "Injection Molding",
    image: "/images/process/powder-metallurgy-5.jpg",
    summary:
      "Injection moulding from tool try-out through serial production, polymer range matched to programme.",
    processScope: PROCESS_SCOPE,
    materials: "ABS, PC, PP, POM, Nylon, specialty polymers",
    tolerances: "±0.05 mm",
    inspection: "Dimensional + visual per AQL",
    productionScale: PRODUCTION_SCALE,
    applications: [
      "Housings and covers",
      "Functional polymer parts",
      "High-volume mouldings",
    ],
  },
];
