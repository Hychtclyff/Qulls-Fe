export type StackCategory = {
  label: string;
  dotColor: string;
  items: string[];
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  badgeClassName: string;
};

// 2. Pisahkan Data dari Komponen (Config Driven)
export const STACK_DATA: StackCategory[] = [
  {
    label: "Languages & Frameworks",
    dotColor: "bg-blue-500",
    items: [
      "Next.js", // Updated based on your profile (Fact 13)
      "Laravel", // Updated based on your profile (Fact 13)
      "TypeScript",
      "React",
      "Docker",
      "SQL",
    ],
    badgeVariant: "secondary",
    badgeClassName:
      "hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default",
  },
  {
    label: "Methodologies & Tools",
    dotColor: "bg-emerald-500",
    items: [
      "Extreme Programming", // Updated based on your thesis (Fact 20)
      "Agile",
      "Scrum",
      "Jira",
      "Git/GitHub",
      "Trello",
    ],
    badgeVariant: "outline",
    badgeClassName:
      "bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors cursor-default",
  },
];
