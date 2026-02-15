import {
  Award,
  Briefcase,
  CalendarDays,
  Coins,
  Compass,
  GraduationCap,
  ListTodo,
  LucideIcon,
  Share2,
  Sword,
  User,
  Wrench,
} from 'lucide-react';
import { DashboardData } from './types/data';

export type SchemaField = {
  name: string;
  label: string;
  type: string;
  width: string;
};

export type SchemaItem = {
  label: string;
  icon: LucideIcon;
  fields: SchemaField[];
};

export const SCHEMA_CONFIG: Record<string, SchemaItem> = {
  projects: {
    label: 'Armament Registry',
    icon: Sword,
    fields: [
      { name: 'title_en', label: 'Object Name', type: 'text', width: 'half' },
      { name: 'status', label: 'Status', type: 'text', width: 'half' },
      { name: 'progress', label: 'Progress (%)', type: 'text', width: 'half' },
      { name: 'desc_en', label: 'Attributes', type: 'textarea', width: 'full' },
    ],
  },
  experiences: { label: 'Memory Archives', icon: Briefcase, fields: [] },
  education: { label: 'Training', icon: GraduationCap, fields: [] },
  skills: { label: 'Sacred Arts', icon: Wrench, fields: [] },
  certifications: { label: 'Authority', icon: Award, fields: [] },
  social_links: { label: 'Connections', icon: Share2, fields: [] },
  tasks: { label: 'Mission Log', icon: ListTodo, fields: [] },
  schedules: { label: 'Chronometer', icon: CalendarDays, fields: [] },
  finances: { label: 'Treasury', icon: Coins, fields: [] },
  strategies: { label: 'Strategy Map', icon: Compass, fields: [] },
  profiles: {
    label: 'profile',
    icon: User,
    fields: [],
  },
};

export const genericFields: SchemaField[] = [
  { name: 'title', label: 'Title', type: 'text', width: 'full' },
];

// Populate empty fields with generic defaults
Object.keys(SCHEMA_CONFIG).forEach((key) => {
  if (SCHEMA_CONFIG[key].fields.length === 0) {
    SCHEMA_CONFIG[key].fields = genericFields;
  }
});

// =========================================
// 3. INITIAL DATA
// =========================================

// Fixed anchor date for hydration consistency (May 24, 2026)
const ANCHOR_DATE = new Date('2026-05-24T12:00:00Z');

export const INITIAL_DATA: DashboardData = {
  profiles: {
    id: 1,
    full_name: 'Kirito & Eugeo',
    role_id: 'Swordsmen Integrasi',
    role_en: 'Integrity Knights Unit',
    level: 'Object Control Authority: 50',
    email: 'link_start@underworld.rath',
    location: 'Central Cathedral, Floor 80',
    image_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eugeo',
    about_id: 'Melindungi dunia manusia bersama.',
    about_en: 'Protecting the Human Empire together.',
  },
  projects: [
    {
      id: 1,
      title_id: 'Blue Rose Freeze',
      title_en: 'Blue Rose Freeze',
      desc_id: 'Area of Effect Freezing.',
      desc_en: 'Wide range freezing art.',
      stat_label_en: 'Range',
      stat_value: '500m',
      progress: 85,
      status: 'Optimizing',
    },
    {
      id: 2,
      title_id: 'Starburst Stream',
      title_en: 'Starburst Stream',
      desc_id: '16-hit combo.',
      desc_en: '16-hit dual wield combo.',
      stat_label_en: 'DPS',
      stat_value: 'Infinite',
      progress: 40,
      status: 'Development',
    },
    {
      id: 3,
      title_id: 'Alice Memory Restore',
      title_en: 'Project Alicization',
      desc_id: 'Restore memory fragment.',
      desc_en: 'Recovering lost data.',
      stat_label_en: 'Integrity',
      stat_value: '99%',
      progress: 60,
      status: 'Active',
    },
  ],
  experiences: [
    {
      id: 1,
      company: 'Rulid Village',
      role_id: 'Woodcutter',
      role_en: 'Gigas Cedar Cutter',
      period: 'Underworld Year 378',
      job_type: 'Task',
    },
  ],
  education: [],
  skills: [
    { id: 1, name: 'Aincrad Style', category: 'Sword Skill' },
    { id: 2, name: 'Sacred Arts', category: 'Magic' },
  ],
  certifications: [],
  social_links: [
    { id: 1, name: 'Dark Territory', handle: 'Peace_Treaty', url: '#', icon_name: 'Flag' },
  ],
  services: [],
  tasks: [
    {
      id: 101,
      title: 'Find Alice',
      status: 'active',
      priority: 'Critical',
      due: '2026-05-24',
      type: 'Main Quest',
      desc: 'Climb the Central Cathedral.',
    },
    {
      id: 102,
      title: 'Ice Mining',
      status: 'todo',
      priority: 'Low',
      due: '2026-05-25',
      type: 'Errand',
      desc: 'Get ice from the mountain range.',
    },
    {
      id: 103,
      title: 'Defeat Quinella',
      status: 'done',
      priority: 'High',
      due: '2026-05-20',
      type: 'Boss Raid',
      desc: 'Liberate the Integrity Knights.',
    },
    {
      id: 104,
      title: 'Sword Maintenance',
      status: 'todo',
      priority: 'Medium',
      due: '2026-05-27',
      type: 'Daily',
      desc: 'Polish Blue Rose Sword.',
    },
  ],
  barca_matches: [
    {
      id: 1,
      opponent: 'Real Madrid',
      date: '2026-05-28',
      time: '21:00',
      score: '3 - 1',
      status: 'Finished',
      competition: 'La Liga',
      home: true,
    },
    {
      id: 2,
      opponent: 'Bayern Munich',
      date: '2026-06-04',
      time: '20:45',
      score: 'VS',
      status: 'Upcoming',
      competition: 'UCL Final',
      home: false,
    },
    {
      id: 3,
      opponent: 'Girona',
      date: '2026-05-21',
      time: '19:00',
      score: '2 - 0',
      status: 'Finished',
      competition: 'La Liga',
      home: true,
    },
  ],
  schedules: [
    {
      id: 201,
      title: 'Integrity Knight Meeting',
      date: '2026-05-24',
      time: '09:00',
      endTime: '10:30',
      type: 'Briefing',
      location: 'Floor 50',
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    {
      id: 202,
      title: 'Sword Skill Practice',
      date: '2026-05-24',
      time: '14:00',
      endTime: '16:00',
      type: 'Training',
      location: 'Arena',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      id: 203,
      title: 'Dinner with Alice',
      date: '2026-05-24',
      time: '19:00',
      endTime: '20:30',
      type: 'Personal',
      location: 'Log House',
      color: 'bg-pink-100 text-pink-700 border-pink-200',
    },
    {
      id: 204,
      title: 'Patrol Dark Territory',
      date: '2026-05-25',
      time: '06:00',
      endTime: '12:00',
      type: 'Mission',
      location: 'Eastern Gate',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      id: 205,
      title: 'Sacred Arts Study',
      date: '2026-05-25',
      time: '13:00',
      endTime: '15:00',
      type: 'Study',
      location: 'Library',
      color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    },
  ],
  finances: [
    {
      id: 301,
      title: 'Quest Reward: Goblin Slayer',
      amount: 5000,
      type: 'income',
      category: 'Quest',
      date: '2026-05-20',
    },
    {
      id: 302,
      title: 'Blacksmith Repair',
      amount: -1200,
      type: 'expense',
      category: 'Maintenance',
      date: '2026-05-21',
    },
    {
      id: 303,
      title: 'Healing Potions (x10)',
      amount: -500,
      type: 'expense',
      category: 'Consumables',
      date: '2026-05-22',
    },
    {
      id: 304,
      title: 'Sold Dragon Scales',
      amount: 15000,
      type: 'income',
      category: 'Trade',
      date: '2026-05-23',
    },
    {
      id: 305,
      title: 'Inn Stay (Rulid)',
      amount: -200,
      type: 'expense',
      category: 'Living',
      date: '2026-05-23',
    },
  ],
  habits: [
    { id: 401, title: 'Code 1 Hour', completed: false, streak: 5 },
    { id: 402, title: 'Read Light Novel', completed: true, streak: 12 },
    { id: 403, title: 'Drink 2L Water', completed: false, streak: 2 },
    { id: 404, title: 'Morning Run', completed: false, streak: 0 },
  ],
  notes: [
    {
      id: 501,
      content: 'Check the new Next.js 14 documentation regarding Server Actions.',
      date: '2026-05-24',
    },
    {
      id: 502,
      content: 'Idea: Build a CLI tool for auto-generating component structures.',
      date: '2026-05-23',
    },
  ],
  strategies: [
    {
      id: 601,
      title: 'Master React Server Components',
      type: 'short',
      status: 'In Progress',
      deadline: 'June 2026',
      progress: 65,
      category: 'Skill',
    },
    {
      id: 602,
      title: 'Launch Personal SaaS',
      type: 'short',
      status: 'Planning',
      deadline: 'August 2026',
      progress: 20,
      category: 'Project',
    },
    {
      id: 603,
      title: 'Become Senior Tech Lead',
      type: 'long',
      status: 'Locked',
      deadline: 'Year 2028',
      progress: 0,
      category: 'Career',
    },
    {
      id: 604,
      title: 'Financial Freedom (100k Col)',
      type: 'long',
      status: 'Active',
      deadline: 'Year 2030',
      progress: 15,
      category: 'Finance',
    },
    {
      id: 605,
      title: 'Visit Japan (Real World)',
      type: 'long',
      status: 'Dream',
      deadline: 'Year 2027',
      progress: 40,
      category: 'Personal',
    },
  ],
  visitorStats: [
    { day: 'Mon', count: 450, color: 'bg-cyan-200' },
    { day: 'Tue', count: 320, color: 'bg-cyan-300' },
    { day: 'Wed', count: 550, color: 'bg-cyan-400' },
    { day: 'Thu', count: 480, color: 'bg-cyan-500' },
    { day: 'Fri', count: 600, color: 'bg-indigo-400' },
    { day: 'Sat', count: 750, color: 'bg-indigo-500' },
    { day: 'Sun', count: 890, color: 'bg-indigo-600' },
  ],
  // Generating deterministic data to prevent hydration mismatch
  githubContributions: Array.from({ length: 28 }, (_, i) => {
    // Calculate date backwards from ANCHOR_DATE
    const d = new Date(ANCHOR_DATE);
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toISOString().split('T')[0];

    // Simple deterministic pseudo-random logic
    // (i * 7) % 13 provides a varied sequence like 0, 7, 1, 8, 2, 9...
    const count = (i * 7) % 13;

    return {
      date: dateStr,
      count: count,
    };
  }),
  chats: [
    {
      id: 1,
      user: 'Asuna Yuuki',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asuna',
      status: 'online',
      messages: [
        { sender: 'them', text: "Kirito, don't forget the meeting!" },
        { sender: 'me', text: 'Roger that, Asuna.' },
      ],
    },
    {
      id: 2,
      user: 'Klein',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Klein',
      status: 'offline',
      messages: [{ sender: 'them', text: 'Pizza tonight?' }],
    },
    {
      id: 3,
      user: 'Client: Rath Inc',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rath',
      status: 'online',
      messages: [{ sender: 'them', text: 'We need an update on the dashboard.' }],
    },
  ],
  aiHistory: [
    {
      sender: 'ai',
      text: 'Greetings, Unit 32. I am Yui (Cardinal System Agent). How can I assist your coding tasks today?',
    },
  ],
};
