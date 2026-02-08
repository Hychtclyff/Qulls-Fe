import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface TechCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  noPadding?: boolean;
}

export const TechCard = ({
  children,
  className,
  title,
  icon: Icon,
  action,
  noPadding = false,
}: TechCardProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden group transition-all duration-500 hover:shadow-md hover:border-blue-300/50",
        className
      )}
    >
      {/* SAO Decorations */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-hover:w-8 z-20"></div>
      <div className="absolute top-0 left-0 h-0 w-[2px] bg-blue-500 transition-all duration-500 group-hover:h-8 z-20"></div>
      <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 group-hover:w-8 z-20"></div>
      <div className="absolute bottom-0 right-0 h-0 w-[2px] bg-blue-500 transition-all duration-500 group-hover:h-8 z-20"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[size:4px_4px] group-hover:opacity-[0.05] transition-opacity" />

      {(title || Icon) && !noPadding && (
        // Reduced padding-bottom (pb-2 -> pb-1) to tighten gap between title and content
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-5 px-6 relative z-10">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="relative group/icon">
                <div className="absolute inset-0 bg-blue-400/30 blur-lg rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-2 bg-slate-100 rounded-md text-slate-500 group-hover:text-blue-600 transition-colors">
                  <Icon size={18} />
                </div>
              </div>
            )}
            <CardTitle className="text-xs font-bold tracking-widest text-slate-500 uppercase group-hover:text-slate-800 transition-colors font-mono">
              {title}
            </CardTitle>
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
      )}

      {/* Reduced padding-top (pt-4 -> pt-2) to tighten gap */}
      <CardContent
        className={cn("relative z-10 ", noPadding ? "p-0" : "pt-2 pb-5 px-6")}
      >
        {children}
      </CardContent>
    </Card>
  );
};
