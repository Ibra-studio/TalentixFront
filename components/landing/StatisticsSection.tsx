export default function StatisticsSection() {
  const stats = [
    { value: "75%", label: "De temps gagné" },
    { value: "80%", label: "De réduction des coûts de recrutement" },
    { value: "52%", label: "De candidats qualifiés en plus" },
  ];

  return (
    <section 
      aria-label="Section statistiques" 
      className="w-full py-20 px-4 md:px-37.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-5xl md:text-6xl font-bold text-(--landing-dark) mb-4">
              {stat.value}
            </h3>
            <p className="text-lg md:text-xl text-(--landing-dark)/80 font-medium ">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}