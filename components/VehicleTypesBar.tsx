import { getTranslations } from "next-intl/server";
import {
  CarIcon,
  MotorcycleIcon,
  VanIcon,
  SteeringWheelIcon,
  UsersIcon,
} from "./icons/AppIcons";

const ICONS = [CarIcon, MotorcycleIcon, VanIcon, SteeringWheelIcon, UsersIcon];
const ACCENTS = ["#00A7E5", "#F2137B", "#1F1BE8", "#00A7E5", "#F2137B"];

export default async function VehicleTypesBar() {
  const t = await getTranslations("vehicleTypes");
  const items = t.raw("items") as string[];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-14 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          {t("label")}
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-12">
          {items.map((type, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div key={type} className="group flex w-28 flex-col items-center gap-4 text-center sm:w-32">
                <span
                  className="float-idle flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 sm:h-24 sm:w-24"
                  style={{
                    background: `${accent}1f`,
                    boxShadow: `0 14px 36px ${accent}1a`,
                    color: accent,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  <Icon className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11" />
                </span>
                <span className="text-base font-semibold text-slate-700 dark:text-slate-200 sm:text-lg">
                  {type}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
