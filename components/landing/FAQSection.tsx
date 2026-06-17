"use client"; // Indispensable pour gérer le clic d'ouverture/fermeture

import React, { useState } from 'react';

export default function FAQSection() {
  // L'état qui stocke l'ID de la question ouverte. 
  // On met '2' par défaut pour que la 2ème question soit ouverte au chargement, comme sur ton design.
  const [openId, setOpenId] = useState<number | null>(2);

  // La fonction pour ouvrir/fermer au clic
  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "A quoi sert Talentix africa ?",
      // Réponse factice pour l'exemple
      answer: "Talentix Africa est une solution tout-en-un conçue pour simplifier, accélérer et centraliser vos processus de recrutement sur le continent africain."
    },
    {
      id: 2,
      question: "Concrètement que fait l'IA dans talentix africa ?",
      answer: (
        <div className="space-y-3">
          <p>L'IA de Talentix peut intervenir sur plusieurs types de contenus, notamment :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>les annonces de recrutement,</li>
            <li>les messages envoyés aux candidats,</li>
            <li>les comptes rendus d'entretien,</li>
            <li>les évaluations et notes internes.</li>
          </ul>
          <p>Elle s'adapte aux usages quotidiens du recrutement, sans modifier vos pratiques.</p>
        </div>
      )
    },
    {
      id: 3,
      question: "Comment Talentix africa ameliore -t-elle la marque employeur ?",
      answer: "En offrant une expérience candidat fluide, des réponses rapides grâce aux automatisations, et un site carrière personnalisé à vos couleurs."
    },
    {
      id: 4,
      question: "Les donnees utilisees par talentix africa sont elle securisees ?",
      answer: "Absolument. Nous respectons les normes RGPD et utilisons des serveurs hautement sécurisés pour garantir la confidentialité de vos données et de celles de vos candidats."
    },
    {
      id: 5,
      question: "Quel est le meilleur Logiciel de recrutement en Afrique francophone ?",
      answer: "Il existe une multitude de logiciels RH sur le marché de l'Afrique francophone, mais Talentix Africa se distingue par un parti pris fort : nous ne faisons que du recrutement. Pourquoi ? Parce qu'attirer les meilleurs talents ne se résume pas à un simple module noyé dans un outil généraliste.Grâce à des fonctionnalités complètes, un design pensé pour les recruteurs africains, et une IA de pointe, notre solution surclasse les modules de recrutement traditionnels. C'est l'outil incontournable conçu spécifiquement pour les PME et ETI."
    }
  ];

  return (
    <section 
      aria-label="Foire aux questions" 
      className="w-full py-24 px-6 md:px-12 lg:px-37.5 "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* COLONNE GAUCHE : TITRE */}
        <div className="md:w-1/3 shrink-0">
          <h2 className="text-3xl md:text-5xl font-bold text-(--landing-dark) leading-tight">
            Questions<br />
            frequentes
          </h2>
        </div>

        {/* COLONNE DROITE : ACCORDÉONS */}
        <div className="md:w-2/3 flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id}
                // Fond bleu clair avec coins arrondis
                className="bg-[#eef5ff] rounded-[20px] overflow-hidden transition-all duration-300"
              >
                {/* EN-TÊTE CLIQUABLE */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="font-medium text-(--landing-dark) md:text-lg">
                    {faq.question}
                  </span>
                  
                  {/* ICÔNE CHEVRON (Haut si ouvert, Bas si fermé) */}
                  <span className="text-(--landing-dark) shrink-0 ml-4">
                    {isOpen ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    )}
                  </span>
                </button>

                {/* CONTENU DE LA RÉPONSE (Affiché uniquement si isOpen est true) */}
                <div 
                  className={`px-6 text-(--landing-dark)/80 text-sm md:text-base leading-relaxed transition-all duration-300
                    ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'}`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}