import { Zap } from "lucide-react";
import { TechCard } from "../ui/tech-card";
import { MY_SERVICES } from "../../data/my-services";
import { TRANSLATIONS } from "../../data/translations";
import { useTranslation } from "../../hooks/use-translations";

export const CoreServices = () => {
  const { lang } = useTranslation();
  return (
    <TechCard
      title={TRANSLATIONS[lang].services.title}
      icon={Zap}
      className="flex-1 bg-white/80"
    >
      <div className="flex flex-col gap-2 h-full justify-center">
        {MY_SERVICES.map((service, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all group cursor-default"
          >
            <div
              className={`p-2.5 rounded-xl ${service.bg} ${service.color} shrink-0 shadow-inner`}
            >
              <service.icon size={18} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-700 truncate">
                {TRANSLATIONS[lang].services[service.id]}
              </h4>
              <p className="text-[10px] text-slate-400 truncate">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TechCard>
  );
};
