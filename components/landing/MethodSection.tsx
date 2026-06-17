import React from 'react';
import { CheckIcon, ConnectionArrow, CrossIcon } from './Icons';

export default function MethodSection() {
  // Liste "Avant Talentix" (Facile à modifier, ajouter ou supprimer)
  const avantPoints = [
    "200 CV triés manuellement chaque semaine",
    "Candidats perdus dans les spams",
    "Managers qui vous relancent en boucle",
    "Top profils partis chez la concurrence",
    "Des fichiers Excel qui deviennent vite obsolètes",
    "Laissez les candidats sans nouvelles et ruiner votre marque employeur"
  ];

  // Liste "Avec Talentix" (Facile à modifier, ajouter ou supprimer)
  const avecPoints = [
    "L'IA vous propose les meilleurs talents, et vous aide à rédiger vos mails et jobposts",
    "Pipeline de candidature collaborative",
    "Managers autonomes, zéro relance",
    "Mails de refus ou d'invitation d'entretien envoyés directement"
  ];

  return (
    <section
      aria-label="Comparaison des méthodes de recrutement"
      className="flex flex-col items-center justify-start text-center min-h-200 py-[75px] px-6 overflow-hidden"
      style={{ backgroundColor: "var(--landing-bg-secondary)" }}
    >
      {/* Titre principal fluide */}
      <h2 
        className="font-semibold leading-tight mb-16"
        style={{
          fontSize: "clamp(1.5rem, 4vw + 1rem, 2.5rem)",
          color: "var(--landing-dark)",
        }}
      >
        Ce n'est pas que vous recrutez mal.<br/> 
        <span className="text-[#676767]">C'est que</span> vous utilisez les mauvais outils
      </h2>

      {/* Conteneur des cartes + de la flèche */}
<div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-5 max-w-5xl w-full mt-4 mx-auto">
        
        {/* CARTE : AVANT TALENTIX */}
        <div 
          className="w-full max-w-[420px] p-8 rounded-[15px] shadow-sm text-left transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
          style={{ 
            backgroundColor: "var(--landing-card-bg-red)",
            color: "var(--landing-dark)",
            transform: "rotate(-2.5deg)" /* Inclinaison vers la gauche */
          }}
        >
          <span className="block text-center uppercase tracking-wider text-sm font-medium opacity-80 mb-2">
            Avant talentix
          </span>
          <h3 className="text-xl font-bold text-center mb-1 border-b border-black/10 pb-3 line-through decoration-black/40">
            La méthode que vous utilisez sûrement
          </h3>
          

          <ul className="space-y-4">
            {avantPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm font-medium leading-relaxed">
                <CrossIcon size={21} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FLÈCHE DÉCORATIVE (Visible uniquement sur ordinateur) */}
          <div className='hidden md:block'>
          <ConnectionArrow/>
          </div>

        

        {/* CARTE : AVEC TALENTIX */}
        <div 
          className="w-full max-w-[420px] p-8 rounded-[15px] shadow-md text-left transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
          style={{ 
            backgroundColor: "var(--landing-card-bg-green)",
            color: "var(--landing-dark)",
            transform: "rotate(2deg)" /* Inclinaison vers la droite */
          }}
        >
          <span className="block text-center uppercase tracking-wider text-sm font-bold tracking-widest mb-2">
            Avec talentix
          </span>
          <h3 className="text-xl font-bold text-center mb-1 border-b border-black/10 pb-3">
            Le nouveau standard de recrutement
          </h3>
          <ul className="space-y-4">
            {avecPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm font-semibold leading-relaxed">
               <CheckIcon/>
                <span>{point}</span>
              </li>
            ))}
          </ul>
            <p className="text-xs text-center opacity-0 mb-6 italic">
            Invisible spacer
          </p>
        </div>

      </div>
    </section>
  );
}