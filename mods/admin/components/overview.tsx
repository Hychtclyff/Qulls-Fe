// Asumsi Anda punya komponen ini terpisah
import { DashboardData } from '../types/data';
import { GitHubStats } from './shared/gitHubStats';
import { CardSummary } from './shared/cardSummary';
import { ProfileCard } from './shared/profileCard';
import { ProjectCard } from './shared/projectCard';
import { ScheduleCard } from './shared/scheduleCard';
import { VisualizerCard } from './shared/visualizerCard';
import { VisitorCard } from './shared/visitorCard';
import { MatchCards } from './shared/matchCard';

interface RenderOverviewProps {
  data: DashboardData;
}

export const Overview = ({ data }: RenderOverviewProps) => {
  // Combine and sort upcoming tasks and schedules for "1 Week Ahead"
  const now = new Date('2026-05-24'); // Mock current date
  const oneWeekLater = new Date('2026-05-31');

  const upcomingItems = [
    ...data.tasks
      .filter((t) => t.status !== 'done')
      .map((t) => ({
        ...t,
        type: 'Mission' as const, // 👈 Tambahkan 'as const' di sini
        date: t.due,
      })),
    ...data.schedules.map((s) => ({
      ...s,
      type: 'Event' as const, // 👈 Tambahkan 'as const' di sini juga
      date: s.date,
    })),
  ]
    .filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= now && itemDate <= oneWeekLater;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  return (
    <div className="animate-fade-in-up space-y-8">
      <CardSummary data={data} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-8 lg:col-span-3">
          <ProfileCard />
          <GitHubStats contributions={data.githubContributions} />

          {/* Active Projects Progress */}
          <ProjectCard projects={data.projects} />

          {/* NEW: UPCOMING SCHEDULE (1 WEEK) */}
          <ScheduleCard upcomingItems={upcomingItems} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <VisualizerCard />

          <VisitorCard visitorStats={data.visitorStats} />

          <MatchCards barca_matches={data.barca_matches} />
        </div>
      </div>
    </div>
  );
};
