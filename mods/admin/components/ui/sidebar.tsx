import * as React from 'react';
import {
  Bot,
  BrainCircuit,
  CalendarDays,
  Coins,
  Compass,
  ListTodo,
  MessageCircle,
  Moon,
  User,
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
} from '@/common/components/public/ui/sidebar';
import { NavButton } from './NavButton';
import { SCHEMA_CONFIG } from '../../data';

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export const AppSidebar = ({ activeTab, setActiveTab, ...props }: SidebarProps) => {
  return (
    <ShadcnSidebar
      collapsible="offcanvas"
      {...props}
      className="border-r border-indigo-900/50 bg-[#0f172a] text-slate-300 shadow-2xl"
    >
      {/* Background Gradients (Absolute) */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-b from-[#0f172a] to-[#1e1b4b]"></div>
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-32 w-full bg-gradient-to-b from-indigo-500/10 to-transparent"></div>

      <SidebarHeader className="relative z-10 border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Moon size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-mono text-lg font-bold tracking-widest text-white">
              RATH<span className="text-indigo-400">.OS</span>
            </h1>
            <p className="text-[10px] tracking-widest text-slate-500 uppercase">
              Administrator Console
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar relative z-10 p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 font-mono text-[10px] tracking-widest text-indigo-400 uppercase opacity-70">
            Main Visualizer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="overview">
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="O\overview"
                >
                  <NavButton
                    label="Status Window"
                    icon={User}
                    active={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="Workspace"
                >
                  <NavButton
                    label="workspace"
                    icon={BrainCircuit}
                    active={activeTab === 'workspace'}
                    onClick={() => setActiveTab('workspace')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="chat"
                >
                  <NavButton
                    label="Cardinal Link"
                    icon={MessageCircle}
                    active={activeTab === 'chat'}
                    onClick={() => setActiveTab('chat')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="ai"
                >
                  <NavButton
                    label="AI Lab"
                    icon={Bot}
                    active={activeTab === 'ai'}
                    onClick={() => setActiveTab('ai')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 font-mono text-[10px] tracking-widest text-cyan-400 uppercase opacity-70">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="task"
                >
                  <NavButton
                    label="Mission Log"
                    icon={ListTodo}
                    active={activeTab === 'tasks'}
                    onClick={() => setActiveTab('tasks')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="schedules"
                >
                  <NavButton
                    label="Chronometer"
                    icon={CalendarDays}
                    active={activeTab === 'schedules'}
                    onClick={() => setActiveTab('schedules')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="finance"
                >
                  <NavButton
                    label="finance"
                    icon={Coins}
                    active={activeTab === 'finances'}
                    onClick={() => setActiveTab('finances')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  tooltip="strategies"
                >
                  <NavButton
                    label="Strategy Map"
                    icon={Compass}
                    active={activeTab === 'strategies'}
                    onClick={() => setActiveTab('strategies')}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 font-mono text-[10px] tracking-widest text-cyan-400 uppercase opacity-70">
            Database
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.keys(SCHEMA_CONFIG)
                .filter((k) => !['tasks', 'schedules', 'finances', 'strategies',].includes(k))
                .map((key) => {
                  const config = SCHEMA_CONFIG[key as keyof typeof SCHEMA_CONFIG];
                  return (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton
                        asChild
                        className="data-[slot=sidebar-menu-button]:!p-1.5"
                        tooltip={config.label}
                      >
                        <NavButton
                          label={config.label}
                          icon={config.icon}
                          active={activeTab === key}
                          onClick={() => setActiveTab(key)}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative z-10 border-t border-slate-800 bg-slate-900/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
            A
          </div>
          <div>
            <p className="text-xs font-bold text-white">Administrator</p>
            <p className="text-[10px] text-indigo-300">Authority: Level 100</p>
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};
