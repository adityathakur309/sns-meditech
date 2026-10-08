export type Partner = {
  slug: string;
  name: string;
  logo: string;
  summary: string;
  focus: string[];
};

export const partners: Partner[] = [
  {
    slug: "draeger",
    name: "Dräger",
    logo: "/images/3.png",
    summary:
      "Featured across SNS Meditech’s anaesthesia, critical care, neonatal, monitoring, and hospital infrastructure catalogue.",
    focus: [
      "Anesthesia workstations",
      "ICU and transport ventilation",
      "Patient monitoring",
      "Neonatal care",
      "Surgical lights, pendants, and modular OT",
    ],
  },
  {
    slug: "erbe",
    name: "Erbe",
    logo: "/images/2.png",
    summary:
      "Featured across SNS Meditech’s electrosurgery and gastroenterology technology range.",
    focus: [
      "Electrosurgical systems",
      "Argon plasma coagulation",
      "Vessel sealing",
      "Hydro surgery and waterjet",
      "Cryosurgery and smoke evacuation",
    ],
  },
  {
    slug: "fujifilm-medwork",
    name: "Fujifilm Medwork",
    logo: "/images/1.png",
    summary:
      "Featured as a technology partner on the SNS Meditech site.",
    focus: ["Technology partnership"],
  },
];

export function getPartner(slug: string) {
  return partners.find((partner) => partner.slug === slug);
}
