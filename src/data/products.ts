export type Product = {
  slug: string;
  name: string;
  category: string;
  partner: "Dräger" | "Erbe" | "SNS Meditech";
  image: string;
  gallery: string[];
  summary: string;
  description: string;
  applications: string[];
  solutionSlugs: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "fabius-plus",
    name: "Fabius Plus",
    category: "Anesthesia Machines",
    partner: "Dräger",
    image: "/images/FABIUS_PLUS_converted.jpg",
    gallery: ["/images/FABIUS_PLUS_converted.jpg", "/images/ANEASTHESIA_MACHINES.jpg"],
    summary: "Anaesthesia workstation from the Dräger portfolio.",
    description:
      "Fabius Plus is listed in SNS Meditech’s anaesthesia machines range. It is an anaesthesia workstation intended for hospital operating environments. Detailed specifications are available on request.",
    applications: ["Operating theatres", "Anaesthesia departments"],
    solutionSlugs: ["anesthesia-critical-care"],
    featured: true,
  },
  {
    slug: "anesthesia-machines",
    name: "Anesthesia Machines",
    category: "Anesthesia Machines",
    partner: "Dräger",
    image: "/images/ANEASTHESIA_MACHINES.jpg",
    gallery: ["/images/ANEASTHESIA_MACHINES.jpg", "/images/FABIUS_PLUS_converted.jpg"],
    summary: "Anaesthesia delivery systems for surgical and procedural care.",
    description:
      "SNS Meditech supplies anaesthesia machines as part of its Anesthesia and Critical Care portfolio, supporting teams that manage pain, sedation, and patient safety during procedures.",
    applications: ["Operating theatres", "Procedural anaesthesia"],
    solutionSlugs: ["anesthesia-critical-care"],
    featured: true,
  },
  {
    slug: "vista-300",
    name: "Vista 300",
    category: "Patient Monitors",
    partner: "Dräger",
    image: "/images/VISTA_300_converted.jpg",
    gallery: ["/images/VISTA_300_converted.jpg", "/images/PATINET_MONITORS.jpg"],
    summary: "Patient monitor from the Dräger monitoring range.",
    description:
      "Vista 300 is listed in SNS Meditech’s patient monitoring catalogue. It is intended for clinical monitoring environments. Detailed specifications are available on request.",
    applications: ["Operating theatres", "ICU", "Recovery"],
    solutionSlugs: ["patient-monitoring", "anesthesia-critical-care"],
    featured: true,
  },
  {
    slug: "patient-monitors",
    name: "Patient Monitors",
    category: "Patient Monitors",
    partner: "Dräger",
    image: "/images/PATINET_MONITORS.jpg",
    gallery: ["/images/PATINET_MONITORS.jpg", "/images/VISTA_300_converted.jpg"],
    summary: "Patient monitoring systems for perioperative and critical care.",
    description:
      "Patient monitors are a core SNS Meditech category, used wherever clinical teams need continuous visibility of vital functions during surgery, intensive care, and recovery.",
    applications: ["Operating theatres", "ICU and HDU", "Wards"],
    solutionSlugs: ["patient-monitoring", "anesthesia-critical-care"],
  },
  {
    slug: "evita-v800",
    name: "Evita V800",
    category: "Ventilators",
    partner: "Dräger",
    image: "/images/EVITA_V800_converted.jpg",
    gallery: ["/images/EVITA_V800_converted.jpg", "/images/VENTILATORS.jpg"],
    summary: "ICU ventilator from the Dräger critical care range.",
    description:
      "Evita V800 is listed in SNS Meditech’s ventilator catalogue for critical care settings. Technical configuration depends on the hospital specification and is provided on enquiry.",
    applications: ["Intensive care units", "Critical care ventilation"],
    solutionSlugs: ["anesthesia-critical-care"],
    featured: true,
  },
  {
    slug: "ventilators",
    name: "Ventilators",
    category: "Ventilators",
    partner: "Dräger",
    image: "/images/VENTILATORS.jpg",
    gallery: ["/images/VENTILATORS.jpg", "/images/EVITA_V800_converted.jpg"],
    summary: "Ventilation systems for intensive and high-dependency care.",
    description:
      "SNS Meditech lists ventilators among its critical care technologies, supporting life-supporting treatment for patients with severe illness, trauma, or post-surgical complications.",
    applications: ["ICU", "High-dependency units"],
    solutionSlugs: ["anesthesia-critical-care"],
  },
  {
    slug: "oxylog-3000-plus",
    name: "Oxylog 3000 plus",
    category: "Transport Ventilators",
    partner: "Dräger",
    image: "/images/TRANSPORT_VENTILATORS.jpg",
    gallery: ["/images/TRANSPORT_VENTILATORS.jpg"],
    summary: "Transport ventilator from the Dräger emergency and transfer range.",
    description:
      "Oxylog 3000 plus is listed in SNS Meditech’s transport ventilator offering, used when ventilated patients need to move between departments or care settings.",
    applications: ["Intra-hospital transfer", "Emergency ventilation"],
    solutionSlugs: ["anesthesia-critical-care"],
    featured: true,
  },
  {
    slug: "transport-ventilators",
    name: "Transport Ventilators",
    category: "Transport Ventilators",
    partner: "Dräger",
    image: "/images/TRANSPORT_VENTILATORS.jpg",
    gallery: ["/images/TRANSPORT_VENTILATORS.jpg"],
    summary: "Ventilation for patient transfer and emergency movement.",
    description:
      "Transport ventilators in the SNS Meditech catalogue support emergency and intra-hospital movement of ventilated patients.",
    applications: ["Patient transfer", "Emergency care"],
    solutionSlugs: ["anesthesia-critical-care"],
  },
  {
    slug: "babylog-vn600",
    name: "Babylog VN600",
    category: "Neonatal Ventilators",
    partner: "Dräger",
    image: "/images/BABY_LOG_converted.jpg",
    gallery: ["/images/BABY_LOG_converted.jpg", "/images/NEONATAL_HFO_VENTILATORS.jpg"],
    summary: "Neonatal ventilator from the Dräger Babylog range.",
    description:
      "Babylog VN600 is listed in SNS Meditech’s neonatal ventilation range. Configuration and accessories are confirmed against the clinical requirement on enquiry.",
    applications: ["NICU", "Neonatal ventilation"],
    solutionSlugs: ["neonatal-care"],
    featured: true,
  },
  {
    slug: "neonatal-hfo-ventilators",
    name: "Neonatal HFO Ventilators",
    category: "Neonatal Ventilators",
    partner: "Dräger",
    image: "/images/NEONATAL_HFO_VENTILATORS.jpg",
    gallery: ["/images/NEONATAL_HFO_VENTILATORS.jpg", "/images/BABY_LOG_converted.jpg"],
    summary: "High-frequency oscillatory ventilation for neonatal care.",
    description:
      "Neonatal HFO ventilators are part of SNS Meditech’s newborn care catalogue, listed alongside incubators, warmers, phototherapy, and jaundice meters.",
    applications: ["NICU", "Specialist neonatal ventilation"],
    solutionSlugs: ["neonatal-care"],
  },
  {
    slug: "jaundice-meter",
    name: "Jaundice Meter",
    category: "Neonatal Care",
    partner: "Dräger",
    image: "/images/Draeger-Jaundice-Meter.jpg",
    gallery: ["/images/Draeger-Jaundice-Meter.jpg"],
    summary: "Jaundice assessment device from the Dräger neonatal range.",
    description:
      "The jaundice meter is listed in SNS Meditech’s neonatal care products for jaundice assessment in newborn care settings.",
    applications: ["NICU", "Postnatal wards"],
    solutionSlugs: ["neonatal-care"],
  },
  {
    slug: "led-phototherapy",
    name: "LED Phototherapy",
    category: "Neonatal Care",
    partner: "Dräger",
    image: "/images/LED_PHOTOTHERAPY.jpg",
    gallery: ["/images/LED_PHOTOTHERAPY.jpg"],
    summary: "LED phototherapy system for neonatal jaundice treatment environments.",
    description:
      "LED phototherapy is part of SNS Meditech’s neonatal catalogue, used in newborn care alongside jaundice meters, warmers, and incubators.",
    applications: ["NICU", "Jaundice treatment areas"],
    solutionSlugs: ["neonatal-care"],
  },
  {
    slug: "warmers",
    name: "Warmers",
    category: "Neonatal Care",
    partner: "Dräger",
    image: "/images/WARMERS.jpg",
    gallery: ["/images/WARMERS.jpg", "/images/incubator.png"],
    summary: "Infant warming systems for delivery and neonatal care.",
    description:
      "Warmers are listed in SNS Meditech’s neonatal care range for temperature support in delivery rooms and newborn units.",
    applications: ["Labour and delivery", "NICU"],
    solutionSlugs: ["neonatal-care"],
  },
  {
    slug: "incubators",
    name: "Incubators",
    category: "Neonatal Care",
    partner: "Dräger",
    image: "/images/incubator.png",
    gallery: ["/images/incubator.png", "/images/WARMERS.jpg"],
    summary: "Neonatal incubators for controlled infant care environments.",
    description:
      "Incubators appear in SNS Meditech’s neonatal portfolio, supporting controlled care environments for newborns.",
    applications: ["NICU", "Special care baby units"],
    solutionSlugs: ["neonatal-care"],
    featured: true,
  },
  {
    slug: "surgical-lights",
    name: "Surgical and Examination Lights",
    category: "Hospital Infrastructure",
    partner: "Dräger",
    image: "/images/polaris-lights.jpg",
    gallery: ["/images/polaris-lights.jpg", "/images/hero-banner.png"],
    summary: "Surgical and examination lighting for operating and procedure rooms.",
    description:
      "Surgical and examination lights are listed in SNS Meditech’s hospital infrastructure offering, used to illuminate operating and examination environments.",
    applications: ["Operating theatres", "Procedure and examination rooms"],
    solutionSlugs: ["hospital-infrastructure", "surgery"],
  },
  {
    slug: "medical-pendants",
    name: "Medical Pendants and Infrastructure Design",
    category: "Hospital Infrastructure",
    partner: "Dräger",
    image: "/images/system-including.jpg",
    gallery: ["/images/system-including.jpg", "/images/hero-banner.png"],
    summary: "Ceiling supply units and infrastructure design for clinical rooms.",
    description:
      "Medical pendants and infrastructure design are listed by SNS Meditech as part of hospital infrastructure — the service and supply systems that organise gases, power, and equipment around the patient.",
    applications: ["Operating theatres", "ICU bays"],
    solutionSlugs: ["hospital-infrastructure", "surgery"],
  },
  {
    slug: "modular-ot",
    name: "Modular OT",
    category: "Hospital Infrastructure",
    partner: "Dräger",
    image: "/images/MODULAR_OT.jpg",
    gallery: ["/images/MODULAR_OT.jpg", "/images/hero-banner.png"],
    summary: "Modular operating theatre infrastructure.",
    description:
      "Modular OT is listed in SNS Meditech’s infrastructure range for hospitals planning or upgrading operating theatre environments.",
    applications: ["Operating theatre projects", "Hospital infrastructure programmes"],
    solutionSlugs: ["hospital-infrastructure", "surgery"],
    featured: true,
  },
  {
    slug: "consumables",
    name: "Consumables and Accessories",
    category: "Consumables",
    partner: "SNS Meditech",
    image: "/images/Hospital-Accessories-Consumables.jpg",
    gallery: ["/images/Hospital-Accessories-Consumables.jpg"],
    summary: "Consumables and accessories that support installed clinical systems.",
    description:
      "SNS Meditech lists consumables and accessories alongside capital equipment, so hospitals can source supporting items through the same distribution relationship.",
    applications: ["Operating theatres", "ICU", "Neonatal units"],
    solutionSlugs: ["anesthesia-critical-care", "neonatal-care"],
  },
  {
    slug: "hospital-consumables",
    name: "Hospital Consumables and Accessories",
    category: "Consumables",
    partner: "SNS Meditech",
    image: "/images/Hospital-Accessories-Consumables.jpg",
    gallery: ["/images/Hospital-Accessories-Consumables.jpg"],
    summary: "Hospital consumables and accessories for day-to-day clinical use.",
    description:
      "Hospital consumables and accessories are listed in the SNS Meditech catalogue as a supporting category around the primary equipment ranges.",
    applications: ["Hospitals", "Clinics"],
    solutionSlugs: ["hospital-infrastructure"],
  },
  {
    slug: "electrosurgical-unit",
    name: "Electrosurgical Unit",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/ELECRO_SURGICAL_UNIT.jpg",
    gallery: ["/images/ELECRO_SURGICAL_UNIT.jpg", "/images/VIO3.jpg"],
    summary: "Electrosurgical energy platform from the Erbe range.",
    description:
      "Electrosurgical units are listed in SNS Meditech’s surgery and electrosurgery catalogue for cutting and coagulation work in the operating room and related specialties.",
    applications: ["Open surgery", "Minimally invasive surgery", "Gastroenterology"],
    solutionSlugs: ["electrosurgery", "surgery", "gastroenterology-hepatology"],
    featured: true,
  },
  {
    slug: "vio-3",
    name: "VIO 3",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/VIO3.jpg",
    gallery: ["/images/VIO3.jpg", "/images/ELECRO_SURGICAL_UNIT.jpg"],
    summary: "Erbe VIO 3 electrosurgical system.",
    description:
      "VIO 3 is listed in SNS Meditech’s electrosurgery range. Workstation configuration, instruments, and modes are confirmed against the clinical specialty on enquiry.",
    applications: ["General surgery", "Gastroenterology", "Specialist OR work"],
    solutionSlugs: ["electrosurgery", "surgery", "gastroenterology-hepatology"],
    featured: true,
  },
  {
    slug: "vessel-sealers",
    name: "Vessel Sealers",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/VESSEL_SEALERS.png",
    gallery: ["/images/VESSEL_SEALERS.png"],
    summary: "Vessel-sealing instruments from the Erbe electrosurgery range.",
    description:
      "Vessel sealers are listed in SNS Meditech’s electrosurgery offering for surgical teams that need vessel-sealing capability alongside an energy platform.",
    applications: ["General surgery", "Minimally invasive surgery"],
    solutionSlugs: ["electrosurgery", "surgery"],
  },
  {
    slug: "hydro-surgery",
    name: "Hydro Surgery Systems",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/HYDRO_SURGERY_SYSTEMS.jpg",
    gallery: ["/images/HYDRO_SURGERY_SYSTEMS.jpg", "/images/WATERJET.jpg"],
    summary: "Waterjet / hydro surgery systems from the Erbe range.",
    description:
      "Hydro surgery systems are listed in SNS Meditech’s surgery and gastroenterology-related technology range.",
    applications: ["Surgical dissection", "Gastroenterology procedures"],
    solutionSlugs: ["electrosurgery", "gastroenterology-hepatology", "surgery"],
  },
  {
    slug: "waterjet",
    name: "Waterjet",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/WATERJET.jpg",
    gallery: ["/images/WATERJET.jpg", "/images/HYDRO_SURGERY_SYSTEMS.jpg"],
    summary: "Waterjet technology listed in the SNS Meditech Erbe range.",
    description:
      "Waterjet systems appear in SNS Meditech’s catalogue alongside hydro surgery, APC, and electrosurgical platforms.",
    applications: ["Gastroenterology", "Surgical applications"],
    solutionSlugs: ["electrosurgery", "gastroenterology-hepatology"],
  },
  {
    slug: "cryosurgery",
    name: "Cryosurgery",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/CRYO_SURGERY.jpg",
    gallery: ["/images/CRYO_SURGERY.jpg", "/images/cryo.jpg"],
    summary: "Cryosurgery systems from the Erbe range.",
    description:
      "Cryosurgery is listed in SNS Meditech’s surgical technology portfolio for teams that use cryogenic energy as part of their procedure mix.",
    applications: ["Surgical specialties using cryotherapy"],
    solutionSlugs: ["electrosurgery", "surgery"],
  },
  {
    slug: "smoke-evacuator",
    name: "Smoke Evacuator",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/SMOKE_EVACUATOR.jpg",
    gallery: ["/images/SMOKE_EVACUATOR.jpg"],
    summary: "Surgical smoke evacuation for electrosurgery environments.",
    description:
      "Smoke evacuators are listed in SNS Meditech’s electrosurgery range to support operating rooms that use energy devices.",
    applications: ["Operating theatres", "Electrosurgery suites"],
    solutionSlugs: ["electrosurgery", "surgery"],
  },
  {
    slug: "apc-3",
    name: "APC 3",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/APC3.jpg",
    gallery: ["/images/APC3.jpg", "/images/VIO3.jpg"],
    summary: "Argon plasma coagulation module from the Erbe range.",
    description:
      "APC 3 is listed in SNS Meditech’s electrosurgery and gastroenterology-related catalogue. Compatible generators and probes are confirmed on enquiry.",
    applications: ["Gastroenterology", "Surgical APC applications"],
    solutionSlugs: ["electrosurgery", "gastroenterology-hepatology"],
    featured: true,
  },
  {
    slug: "apc-probe",
    name: "APC Probe",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/APC3.jpg",
    gallery: ["/images/APC3.jpg"],
    summary: "APC probes used with argon plasma coagulation systems.",
    description:
      "APC probes are listed in SNS Meditech’s Erbe accessories range for argon plasma coagulation procedures.",
    applications: ["Gastroenterology", "Electrosurgery"],
    solutionSlugs: ["electrosurgery", "gastroenterology-hepatology"],
  },
  {
    slug: "nessie-plate",
    name: "Nessie Plate",
    category: "Electrosurgery",
    partner: "Erbe",
    image: "/images/NESSEY-PLATE.jpg",
    gallery: ["/images/NESSEY-PLATE.jpg"],
    summary: "Nessie plate listed in the SNS Meditech Erbe accessories range.",
    description:
      "The Nessie plate (listed as Nessey Plate on the source site) is part of SNS Meditech’s electrosurgery accessories. Intended use and compatibility are confirmed on enquiry.",
    applications: ["Electrosurgery", "Gastroenterology"],
    solutionSlugs: ["electrosurgery", "gastroenterology-hepatology"],
  },
];

export const productCategories = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: string) {
  if (category === "All") return products;
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const product = getProduct(slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter(
      (item) =>
        item.slug !== slug &&
        (item.category === product.category ||
          item.solutionSlugs.some((solution) => product.solutionSlugs.includes(solution))),
    )
    .slice(0, limit);
}
