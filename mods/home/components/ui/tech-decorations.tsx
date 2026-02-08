import { Plus } from "lucide-react";

export const TechDecorations = () => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    {/* Large Background Hexagon */}
    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] opacity-[0.03]">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-blue-600 fill-current animate-spin-slow"
        style={{ animationDuration: "120s" }}
      >
        <path d="M100 0 L186.6 50 L186.6 150 L100 200 L13.4 150 L13.4 50 Z" />
      </svg>
    </div>

    {/* Floating "Data" Particles */}
    <div className="absolute top-1/4 left-[5%] w-1.5 h-1.5 bg-blue-400/20 rounded-sm animate-pulse"></div>
    <div
      className="absolute top-3/4 right-[10%] w-2 h-2 bg-emerald-400/20 rounded-sm animate-bounce-slow"
      style={{ animationDuration: "7s" }}
    ></div>

    {/* HUD Crosshairs */}
    <div className="absolute top-32 left-8 text-slate-300 opacity-30">
      <Plus size={20} strokeWidth={0.5} />
    </div>
    <div className="absolute bottom-32 right-8 text-slate-300 opacity-30">
      <Plus size={20} strokeWidth={0.5} />
    </div>
  </div>
);
