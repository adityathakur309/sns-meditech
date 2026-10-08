export type Client = {
  name: string;
  shortName: string;
  logo: string;
};

/** Institutional logos from the legacy SNS Meditech site (Frame1–Frame10). */
export const clients: Client[] = [
  {
    name: "Postgraduate Institute of Medical Education and Research, Chandigarh",
    shortName: "PGIMER Chandigarh",
    logo: "/images/Frame1.png",
  },
  {
    name: "Indira Gandhi Medical College, Shimla",
    shortName: "IGMC Shimla",
    logo: "/images/Frame2.png",
  },
  {
    name: "Dayanand Medical College & Hospital, Ludhiana",
    shortName: "DMCH Ludhiana",
    logo: "/images/Frame3.png",
  },
  {
    name: "Adesh University",
    shortName: "Adesh University",
    logo: "/images/Frame4.png",
  },
  {
    name: "Max Healthcare",
    shortName: "Max Healthcare",
    logo: "/images/Frame5.png",
  },
  {
    name: "Fortis Healthcare",
    shortName: "Fortis",
    logo: "/images/Frame6.png",
  },
  {
    name: "Paras Health",
    shortName: "Paras Health",
    logo: "/images/Frame7.png",
  },
  {
    name: "Alchemist Hospital",
    shortName: "Alchemist Hospital",
    logo: "/images/Frame8.png",
  },
  {
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS",
    logo: "/images/Frame9.png",
  },
  {
    name: "Maharishi Markandeshwar University, Sadopur-Ambala",
    shortName: "MMU Ambala",
    logo: "/images/Frame10.png",
  },
];
