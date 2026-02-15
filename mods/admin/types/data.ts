
// =========================================
// 1. INTERFACES & TYPES
// =========================================

// --- Sub-Interfaces (Entity Definitions) ---

export interface Profile {
  id: number;
  full_name: string;
  role_id: string;
  role_en: string;
  level: string;
  email: string;
  location: string;
  image_url: string;
  about_id: string;
  about_en: string;
}

export interface Project {
  id: number;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  stat_label_en: string;
  stat_value: string;
  progress: number;
  status: 'Optimizing' | 'Development' | 'Active' | string;
}

export interface Experience {
  id: number;
  company: string;
  role_id: string;
  role_en: string;
  period: string;
  job_type: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface SocialLink {
  id: number;
  name: string;
  handle: string;
  url: string;
  icon_name: string;
}

export interface Task {
  id: number;
  title: string;
  status: 'active' | 'todo' | 'done' | string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  due: string;
  type: string;
  desc: string;
}

export interface Match {
  id: number;
  opponent: string;
  date: string;
  time: string;
  score: string;
  status: 'Finished' | 'Upcoming' | string;
  competition: string;
  home: boolean;
}

export interface Schedule {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  type: string;
  location: string;
  color: string;
}

export interface Finance {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense' | string;
  category: string;
  date: string;
}

export interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
}

export interface Note {
  id: number;
  content: string;
  date: string;
}

export interface Strategy {
  id: number;
  title: string;
  type: 'short' | 'long' | string;
  status: 'In Progress' | 'Planning' | 'Locked' | 'Active' | 'Dream' | string;
  deadline: string;
  progress: number;
  category: string;
}

export interface VisitorStat {
  day: string;
  count: number;
  color: string;
}

export interface GithubContribution {
  date: string;
  count: number;
}

// --- Chat Interfaces ---

export interface Message {
  sender: 'me' | 'them' | 'ai';
  text: string;
}

export interface Chat {
  id: number;
  user: string;
  avatar: string;
  status: 'online' | 'offline' | string; // Fixed extra space in 'offline'
  messages: Message[];
}

export interface Education {
  id: number;
  profileId: number;
  school: string;
  degreeId: string;
  degreeEn: string;
  period: string;
  descId: string | null;
  descEn: string | null;
}

export interface Certification {
  id: number;
  profileId: number;
  name: string;
  issuer: string;
  year: string;
  imageUrl: string | null;
  credentialUrl?: string | null;
  descId: string | null;
  descEn: string | null;
  credentialId: number;
}

export interface Service {
  id: number;
  profileId: number;
  serviceKey: string;
  iconName: string;
  colorClass?: string;
  bgClass?: string;
  descId: string;
  descEn: string;
}

// --- Main Dashboard Interface ---

export interface DashboardData {
  profiles: Profile;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  social_links: SocialLink[];
  services: Service[];
  tasks: Task[];
  barca_matches: Match[];
  schedules: Schedule[];
  finances: Finance[];
  habits: Habit[];
  notes: Note[];
  strategies: Strategy[];
  visitorStats: VisitorStat[];
  githubContributions: GithubContribution[];
  chats: Chat[];
  aiHistory: Message[];
}