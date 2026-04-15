export type WorkGridVariant =
  | "aurora"
  | "cbc"
  | "asp"
  | "heritage";

export type WorkGridProject = {
  id: string;
  title: string;
  description: string;
  variant: WorkGridVariant;
};

export const workGridProjects: WorkGridProject[] = [
  {
    id: "aurora-montessori-school",
    title: "Aurora Montessori School",
    description: "A quiet evolution of the AMS brand and site…",
    variant: "aurora",
  },
  {
    id: "cbc-life-on-the-inside",
    title: "CBC Life_On The Inside",
    description: "A charming, made-for-YouTube identity built…",
    variant: "cbc",
  },
  {
    id: "asp-consulting",
    title: "ASP Consulting",
    description: "From listed buildings to thrill rides…",
    variant: "asp",
  },
  {
    id: "heritage-house-dental",
    title: "Heritage House Dental",
    description: "We redrew the iconic house…",
    variant: "heritage",
  },
];
