interface CrystalStarProps {
  className?: string;
  size: number;
}

export const SwordBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.03]">
    <div className="translate-x-[-100px] -rotate-12 transform text-slate-900">
      <div className="clip-path-sword-blade h-96 w-8 bg-current"></div>
      <div className="h-4 w-16 rounded bg-current"></div>
      <div className="h-12 w-4 bg-current"></div>
    </div>
    <div className="translate-x-[100px] rotate-12 transform text-cyan-500">
      <div className="clip-path-sword-blade h-96 w-8 bg-current"></div>
      <div className="relative h-4 w-16 rounded bg-current">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]"></div>
        </div>
      </div>
      <div className="h-12 w-4 bg-current"></div>
    </div>
  </div>
);

export const CrystalStar = ({ className, size = 24 }: CrystalStarProps) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="currentColor">
    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
  </svg>
);

export const PetalRain = () => (
  <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
    {[...Array(12)].map((_, i) => {
      const left = (i * 29) % 100;

      const duration = 8 + (i % 6) * 2;

      const delay = (i * 0.5) % 4;

      const size = 10 + (i % 4) * 5;

      return (
        <div
          key={i}
          className="animate-fall-spin absolute text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
          style={{
            left: `${left}%`,
            top: `-10%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity: 0.8,
          }}
        >
          <CrystalStar size={size} />
        </div>
      );
    })}
  </div>
);

export const IceVines = () => (
  <div className="pointer-events-none fixed inset-0 z-[2]">
    <svg
      className="absolute bottom-0 left-0 h-64 w-64 text-cyan-200/20"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <path d="M0 100 Q 20 50 50 50 T 100 0" className="animate-pulse-slow" />
      <path
        d="M10 100 Q 30 60 40 40 T 80 10"
        className="animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      />
      <circle cx="50" cy="50" r="2" fill="currentColor" className="animate-ping" />
      <circle
        cx="80"
        cy="10"
        r="1"
        fill="currentColor"
        className="animate-ping"
        style={{ animationDelay: '1.5s' }}
      />
    </svg>
    <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-cyan-100/10 to-transparent"></div>
  </div>
);
