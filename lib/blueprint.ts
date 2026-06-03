import blueprintJson from "@/content/blueprint.json";

export type Provenance = "confirmed" | "inferred" | "suggested" | "extracted";

export interface Company {
  name: string;
  headline: string;
  tagline: string;
  about: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface HeroCtas {
  primary: string;
  secondary: string;
}

export interface BuyerChallengeTeaser {
  title: string;
  summary: string;
}

export interface Capability {
  name: string;
  spec: string;
  summary: string;
  pdfBullets?: string[];
  specItems?: string[];
  provenance: Provenance;
}

export interface MaterialFamily {
  family: string;
  grades: string[];
  provenance: Provenance;
}

export interface NamedItem {
  name: string;
  provenance: Provenance;
}

export interface TrustSignal {
  text: string;
  category: string;
  provenance: Provenance;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  provenance: Provenance;
}

export interface QualityMethod {
  method: string;
  summary: string;
  provenance: Provenance;
}

export interface ProgramSupportItem {
  title: string;
  summary: string;
  provenance: Provenance;
}

export interface ProductionScaleItem {
  stage: string;
  description: string;
  provenance: Provenance;
}

export interface BuyerProof {
  headline: string;
  detail: string;
  provenance: Provenance;
}

export interface CustomerLogo {
  url: string;
  name: string;
  source: string;
  isPlaceholder: boolean;
}

export interface LeadTime {
  type: string;
  duration: string;
}

export interface ContactDetails {
  address: string;
  email: string;
  phone: string;
}

export interface Brand {
  logoUrl: string;
  primaryColor: string;
}

export interface ImageProvenance {
  kind: "pdf" | "page" | "curated-stock";
  sourcePdfUrl?: string;
  sourcePdfTitle?: string;
  sourcePdfFilename?: string;
  sourcePdfDocumentType?: string;
  inferredUsageType?: string;
  confidence: number;
  visualMean?: number;
  visualStdev?: number;
  scanIndex?: number;
}

export interface ImageAsset {
  url: string;
  alt: string;
  category: "process" | "product";
  sourcePageType?: "pdf" | "page";
  provenance: ImageProvenance;
}

export interface HeroImage {
  url: string;
  alt: string;
  source: "curated-stock" | "extracted" | "uploaded";
  likelyUsableAsHero: boolean;
  hasVisualAssessment: boolean;
}

export interface EquipmentCard {
  title: string;
  category: string;
  bullets: string[];
  specs: { axes: string; envelope: string; tolerance: string };
  badge?: string;
  evidence: "inferred" | "confirmed";
  utilisationPct: number;
  utilisationVerified: boolean;
}

export interface QualityKpi {
  id: string;
  label: string;
  numericValue: number;
  decimals: number;
  unit: string;
  suffix?: string;
  progressPct: number;
  status: "Improving" | "Stable" | "Verified";
  isInferred: boolean;
}

export interface ProcessHighlight {
  processName: string;
  summary: string;
  bullets: string[];
  programmeTitle: string;
  kpiProof: string;
  sourcePdfUrl: string;
  sourcePdfFilename: string;
  tags: string[];
}

export interface TemplateSlots {
  logoUrl: string;
  companyName: string;
  primaryColor: string;
  navLabels: string[];
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroCta: string;
  heroSecondary: string;
  heroImages: HeroImage[];
  topTrustBadges: string[];
  topProofStats: Stat[];
  stats: Stat[];
  about: string;
  capabilityIntro: string;
  industryIntro: string;
  whyChooseUsIntro: string;
  additionalCapabilities: string[];
  allCapabilitiesCanonical: string[];
  primaryCapabilitiesCanonical: string[];
  secondaryCapabilitiesCanonical: string[];
  buyerChallengeTeaser: BuyerChallengeTeaser;
  recommendationDrivenUpgrades: unknown[];
  capabilities: Capability[];
  certifications: NamedItem[];
  industries: NamedItem[];
  trustSignals: TrustSignal[];
  processWorkflow: ProcessStep[];
  qualityMethods: QualityMethod[];
  programSupport: ProgramSupportItem[];
  productionScale: ProductionScaleItem[];
  buyerProofs: BuyerProof[];
  customerLogos: CustomerLogo[];
  exampleSections: unknown[];
  advancedManufacturing?: EquipmentCard[];
  advancedMfgMeta?: Record<string, unknown>;
  qualityKpis?: QualityKpi[];
  processHighlights?: ProcessHighlight[];
  leadTimes: LeadTime[];
  contactCta: string;
  contactLine: string;
  contactDetails: ContactDetails;
}

export interface Blueprint {
  company: Company;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtas: HeroCtas;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  topTrustBadges: string[];
  topProofStats: Stat[];
  capabilityIntro: string;
  industryIntro: string;
  whyChooseUsIntro: string;
  additionalCapabilities: string[];
  allCapabilitiesCanonical: string[];
  primaryCapabilitiesCanonical: string[];
  secondaryCapabilitiesCanonical: string[];
  buyerChallengeTeaser: BuyerChallengeTeaser;
  recommendationDrivenUpgrades: unknown[];
  stats: Stat[];
  capabilities: Capability[];
  materials: MaterialFamily[];
  certifications: NamedItem[];
  industries: NamedItem[];
  trustSignals: TrustSignal[];
  processWorkflow: ProcessStep[];
  qualityMethods: QualityMethod[];
  programSupport: ProgramSupportItem[];
  productionScale: ProductionScaleItem[];
  buyerProofs: BuyerProof[];
  customerLogos: CustomerLogo[];
  exampleSections: unknown[];
  recommendedPages: string[];
  leadTimes: LeadTime[];
  contactLine: string;
  contactDetails: ContactDetails;
  brand: Brand;
  images: { process: ImageAsset[]; product: ImageAsset[] };
  preservationNotes: string[];
  supplierType: string;
  navLinks: string[];
  templateSlots: TemplateSlots;
}

export const blueprint = blueprintJson as unknown as Blueprint;
