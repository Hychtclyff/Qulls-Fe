import { TechDecorations } from "../ui/tech-decorations";

export const BackgroundAmbience = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-emerald-100/30 rounded-full blur-[100px] opacity-50 -translate-x-1/4 translate-y-1/4"></div>

    <TechDecorations />
  </div>
);
