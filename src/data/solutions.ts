export type Solution = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  description: string[];
  applications: string[];
  productSlugs: string[];
};

export const solutions: Solution[] = [
  {
    slug: "anesthesia-critical-care",
    name: "Anesthesia and Critical Care",
    shortName: "Anesthesia & Critical Care",
    eyebrow: "OR to ICU",
    summary:
      "Technology for anaesthesia delivery, ventilation, and life-supporting care around surgery, trauma, and critical illness.",
    description: [
      "Anesthesia and Critical Care is a specialized medical field focused on the management of pain, sedation, and life-supporting treatments for patients undergoing surgery, trauma, or severe illness.",
      "Anesthesia involves administering medications to prevent pain and discomfort during surgical and medical procedures. This includes general anesthesia (complete unconsciousness), regional anesthesia (numbing a specific part of the body), and local anesthesia (numbing a small area). Anesthesiologists carefully monitor vital functions such as heart rate, blood pressure, and oxygen levels to ensure patient safety.",
      "Critical Care, also known as intensive care medicine, is dedicated to managing critically ill patients in intensive care units (ICUs). This includes patients with severe infections, organ failure, trauma, or post-surgical complications. Critical care specialists use advanced life-support technologies, including ventilators, dialysis, and intravenous medications, to stabilize and treat life-threatening conditions.",
      "Together, anesthesia and critical care play a vital role in modern medicine, ensuring patient safety, pain management, and survival in high-risk situations.",
    ],
    applications: [
      "Operating theatres",
      "Intensive care units",
      "Post-anaesthesia care",
      "Emergency and transport ventilation",
    ],
    productSlugs: [
      "fabius-plus",
      "anesthesia-machines",
      "evita-v800",
      "ventilators",
      "oxylog-3000-plus",
      "transport-ventilators",
      "vista-300",
      "patient-monitors",
    ],
  },
  {
    slug: "surgery",
    name: "Surgery",
    shortName: "Surgery",
    eyebrow: "Operating room",
    summary:
      "A surgical technology portfolio for open and minimally invasive procedures across general surgery and related specialties.",
    description: [
      "Our comprehensive Surgery Services portfolio provide expert, advanced medical technology to ensure the best outcomes for your patients. We offer a wide range of surgical equipment and technologies for minimally invasive, robotic-assisted, and traditional open surgeries across various specialties such as general surgery, cancer surgery, orthopedics, neurosurgery, cardiovascular, ENT and more.",
      "Our dedicated professionals work collaboratively to provide best technologies for your OR. With state-of-the-art medical technologies and a patient-centered approach, we are committed to delivering modern, efficient, and exceptional medical technologies at every step of your surgical journey.",
    ],
    applications: [
      "General surgery",
      "Cancer surgery",
      "Orthopedics",
      "Neurosurgery",
      "Cardiovascular",
      "ENT",
    ],
    productSlugs: [
      "electrosurgical-unit",
      "vio-3",
      "vessel-sealers",
      "smoke-evacuator",
      "surgical-lights",
      "medical-pendants",
      "modular-ot",
    ],
  },
  {
    slug: "gastroenterology-hepatology",
    name: "Gastroenterology and Hepatology",
    shortName: "Gastroenterology",
    eyebrow: "Digestive care",
    summary:
      "Technology used in digestive-system and liver-related procedures, including electrosurgery, APC, and waterjet platforms.",
    description: [
      "Gastroenterology and Hepatology is a specialized branch of medicine focused on the digestive system and liver-related disorders. Gastroenterology deals with the diagnosis, treatment, and management of conditions affecting the gastrointestinal (GI) tract, including the esophagus, stomach, intestines, pancreas, gallbladder, and colon. Common conditions treated include acid reflux, irritable bowel syndrome (IBS), Crohn’s disease, ulcerative colitis, and gastrointestinal cancers.",
      "Hepatology is a subspecialty of gastroenterology that focuses on diseases of the liver, gallbladder, bile ducts, and pancreas. It includes the management of conditions such as hepatitis, liver cirrhosis, fatty liver disease, and liver cancer.",
      "Both fields play a critical role in digestive health, utilizing advanced diagnostic tools like endoscopy, colonoscopy, and imaging techniques to provide effective treatment and improve patient outcomes.",
    ],
    applications: [
      "Endoscopy suites",
      "GI procedure rooms",
      "Hepatology pathways",
    ],
    productSlugs: [
      "apc-3",
      "waterjet",
      "hydro-surgery",
      "electrosurgical-unit",
      "vio-3",
      "nessie-plate",
      "apc-probe",
    ],
  },
  {
    slug: "neonatal-care",
    name: "Neonatal Care",
    shortName: "Neonatal Care",
    eyebrow: "NICU",
    summary:
      "Warming, phototherapy, incubation, jaundice assessment, and neonatal ventilation for newborn care environments.",
    description: [
      "SNS Meditech’s neonatal range covers the equipment listed for newborn and infant care — incubators, warmers, LED phototherapy, jaundice meters, and neonatal ventilation including HFO and the Babylog VN600.",
    ],
    applications: [
      "Neonatal intensive care",
      "Labour and delivery",
      "Paediatric high-dependency care",
    ],
    productSlugs: [
      "incubators",
      "warmers",
      "led-phototherapy",
      "jaundice-meter",
      "babylog-vn600",
      "neonatal-hfo-ventilators",
    ],
  },
  {
    slug: "hospital-infrastructure",
    name: "Hospital Infrastructure",
    shortName: "Infrastructure",
    eyebrow: "Built environment",
    summary:
      "Modular operating theatres, medical pendants, and surgical and examination lighting for hospital infrastructure programmes.",
    description: [
      "SNS Meditech lists modular OT, medical pendant and infrastructure design, and surgical and examination lights as part of its hospital infrastructure offering — the physical systems that surround clinical work.",
    ],
    applications: [
      "Modular operating theatres",
      "Ceiling supply and pendant systems",
      "Surgical and examination lighting",
    ],
    productSlugs: ["modular-ot", "medical-pendants", "surgical-lights"],
  },
  {
    slug: "patient-monitoring",
    name: "Patient Monitoring",
    shortName: "Monitoring",
    eyebrow: "Clinical visibility",
    summary:
      "Patient monitors for perioperative, critical care, and ward environments, including the Vista 300.",
    description: [
      "Patient monitoring is a core part of SNS Meditech’s catalogue, supporting anaesthesia and critical care teams that need continuous visibility of vital functions during procedures and intensive care.",
    ],
    applications: [
      "Operating theatres",
      "ICU and HDU",
      "Recovery and ward monitoring",
    ],
    productSlugs: ["vista-300", "patient-monitors"],
  },
  {
    slug: "electrosurgery",
    name: "Electrosurgery",
    shortName: "Electrosurgery",
    eyebrow: "Energy platforms",
    summary:
      "Electrosurgical units, vessel sealers, APC, hydro surgery, cryosurgery, and smoke evacuation from the Erbe range.",
    description: [
      "SNS Meditech’s electrosurgery offering includes electrosurgical units, vessel sealers, hydro surgery systems, cryosurgery, smoke evacuators, APC 3, waterjet, APC probes, and Nessie plates — technology used across surgical and gastroenterology settings.",
    ],
    applications: [
      "Open and laparoscopic surgery",
      "Gastroenterology procedures",
      "OR energy and smoke management",
    ],
    productSlugs: [
      "electrosurgical-unit",
      "vio-3",
      "vessel-sealers",
      "hydro-surgery",
      "waterjet",
      "cryosurgery",
      "smoke-evacuator",
      "apc-3",
      "apc-probe",
      "nessie-plate",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
