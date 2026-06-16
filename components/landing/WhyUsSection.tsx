export default function WhyUsSection() {
  return (
    <section 
      aria-label="Section pourquoi nous ?" 
      className="w-full px-37.5 flex justify-center items-center"
   
    >
      {/* Conteneur principal arrondi avec la couleur de fond bleue */}
      <div 
        className="w-full  flex flex-col items-center text-center p-12 md:p-20 rounded-[40px]"
        style={{ backgroundColor: "var(--landing-bg-tertiary)" }}
      >
        <p className="text-sm md:text-base font-medium mb-4 text-(--landing-dark) opacity-80">
          Pourquoi choisir Talentix africa ?
        </p>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-(--landing-dark) leading-tight">
          Un logiciel de recrutement complet,<br /> 
          flexible et conforme RGPD
        </h2>
        
        <button 
          className="px-8 py-4 bg-(--landing-dark) text-white font-semibold rounded-full hover:bg-black transition-all duration-300 transform hover:scale-105"
        >
          Commencez gratuitement
        </button>
      </div>
    </section>
  );
}