export type Certification = {
  id: number;
  profileId: number;
  name: string;
  issuer: string;
  year: string;
  imageUrl: string;
  credentialId: string;
  descId: string;
  descEn: string;
  // createdAt: "2026-02-08T05:37:35.615Z";
  // updatedAt: "2026-02-08T05:37:35.615Z";
};

export const CERTIFICATIONS = [
  {
    id: 1,
    name: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    year: "2024",
    image:
      "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/certificate_logo.png",
    credentialId: "2VX3R70KQZYQ",
    description: {
      id: "Kompetensi dalam inisiasi, perencanaan, eksekusi, pemantauan, dan penutupan proyek. Pemahaman mendalam tentang metodologi Agile dan Waterfall.",
      en: "Competency in project initiation, planning, execution, monitoring, and closing. Deep understanding of Agile and Waterfall methodologies.",
    },
    skills: ["Project Management", "Agile", "Risk Management"],
  },
  {
    id: 2,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800&h=600",
    credentialId: "AWS-SAA-C03-XXXX",
    description: {
      id: "Validasi kemampuan merancang arsitektur cloud yang aman dan efisien.",
      en: "Validation of ability to design secure and efficient cloud architectures.",
    },
    skills: ["Cloud Architecture", "AWS Services", "Security"],
  },
  {
    id: 3,
    name: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=600",
    credentialId: "PSM-I-998877",
    description: {
      id: "Pemahaman mendalam tentang kerangka kerja Scrum dan peran Scrum Master.",
      en: "Deep understanding of the Scrum framework and the Scrum Master role.",
    },
    skills: ["Scrum Framework", "Servant Leadership", "Coaching"],
  },
  {
    id: 4,
    name: "Google Data Analytics Professional",
    issuer: "Google",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
    credentialId: "G-DATA-2022",
    description: {
      id: "Keahlian dalam pengumpulan, transformasi, dan organisasi data untuk menarik kesimpulan.",
      en: "Expertise in data collection, transformation, and organization to draw conclusions.",
    },
    skills: ["SQL", "Tableau", "R Programming", "Data Viz"],
  },
];
