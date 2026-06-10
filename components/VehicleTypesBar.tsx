import { getTranslations } from "next-intl/server";

export default async function VehicleTypesBar() {
  const t = await getTranslations("vehicleTypes");
  const items = t.raw("items") as string[];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-8 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-sm text-slate-500 sm:grid-cols-3 lg:grid-cols-6 lg:px-8">
        {items.map((type) => (
          <div key={type}>{type}</div>
        ))}
      </div>
    </section>
  );
}
