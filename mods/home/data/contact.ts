import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export const CONTACT_DATA = {
  email: "yudriqul@example.com",
  location: "Indonesia",
  socials: [
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      handle: "yudriqul-aulia",
      url: "https://linkedin.com/in/yudriqul-aulia",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      handle: "yudriqul",
      url: "https://github.com/yudriqul",
      bg: "bg-slate-100",
      text: "text-slate-800",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      handle: "@yudriqul",
      url: "#",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
  ],
};
