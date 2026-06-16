"use client"; // Obligatoire dans Next.js pour utiliser useRef et useState

import React, { useRef, useState, useEffect } from 'react';
import TrapezeHighlight from "./TrapezeHighlight";
import Image from 'next/image'; // Préparation pour tes images
import { ImageResponse } from 'next/server';

export default function FeaturesSection() {
  // Référence pour manipuler le défilement du conteneur des cartes
const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // États pour savoir si on peut scroller à gauche ou à droite
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Les données de tes cartes (facile à modifier)
  const features = [
    {
      id: 1,
      title: "IA Talentix",
      subtitle: "Votre plume intelligente.",
      description: "Générez vos offres d'emploi en deux clics et optimisez vos contenus pour faire mouche auprès des candidats, tout en gardant la main sur votre expertise.",
      bgColor: "var(--landing-card-bg-green2)", // #CEF4F0
   
      imageSrc: "/images/image-feature-1.png" 
    },
    {
      id: 2,
      title: "Site carrière et marque employeur",
      subtitle: "Soyez irrésistible.",
      description: "Faites briller votre identité avec un site carrière et des offres à votre image. Personnalisez chaque interaction pour offrir une expérience mémorable à vos candidats.",
      bgColor: "var(--landing-card-bg-blue)", // #C7E4FC
     
      imageSrc: "/images/image-feature-2.png"
    },
    {
      id: 3,
      title: "Gestion des candidatures",
      subtitle: "Fluide et centralisé.",
      description: "Gardez la main. Fini les emails de mise à jour. Suivez et gérez vos candidatures en équipe, en temps réel. L'IA suggère, vous décidez.",
      bgColor: "var(--landing-card-bg-green)", // #EBFDB7
      
      imageSrc: "/images/image-feature-3.png"
    },
    {
      id: 4,
      title: "Email  automatique pour chaque etape",
      subtitle: "Communiquez sans effort.",
      description: "Envoyez le bon message au bon moment. Emails de réception, d'entretien ou de refus vos templates sont prêts, personnalisables, et adaptés à chaque étape du recrutement. Plus besoin de repartir d'une page blanche.",
      bgColor: "var(--landing-card-bg-red)", // #FE8A6A
      
      imageSrc: "/images/image-feature-4.png"
    }
  ];

  // Vérifie la position du scroll pour mettre à jour l'apparence des boutons
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // On ajoute une marge d'erreur de 2px pour les arrondis des navigateurs
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  // Initialisation au chargement du composant
  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Fonctions pour faire défiler au clic
const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Sur desktop on scroll d'une carte (790px) + le gap (32px) = 822px environ
      // Sur mobile on scroll de la largeur de l'écran
      const amount = window.innerWidth > 768 ? 822 : window.innerWidth * 0.8;
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section aria-label="Section pour les fonctionnalitées" className="flex flex-col justify-start items-start py-20 px-4 md:px-12 lg:px-[150px] overflow-hidden">
      
      {/* HEADER : Titre centré, Boutons à droite */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-12 gap-8">
        
        <h2 
          className="font-semibold leading-tight text-center"
          style={{
            fontSize: "clamp(2rem, 4vw + 1rem, 2.5rem)",
            color: "var(--landing-dark)",
          }}
        >
          Chaque fonctionnalité a <br className="hidden md:block"/> un seul objectif : <br className="hidden md:block"/>
          <TrapezeHighlight>
            Vous libérer.
          </TrapezeHighlight>
        </h2>
{/* BOUTONS DU SLIDER */}
        <div className="flex gap-4 items-center justify-center">
          
          {/* Bouton Précédent */}
          <button 
            onClick={() => scrollByAmount('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 border-2
              ${!canScrollLeft 
                ? 'bg-white border-gray-300 text-gray-400 cursor-not-allowed' // État Inactif
                : 'bg-[var(--landing-dark)] border-[var(--landing-dark)] text-white hover:bg-black' // État Actif
              }`}
          >
            {/* Flèche Gauche SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Bouton Suivant */}
          <button 
            onClick={() => scrollByAmount('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 border-2
              ${!canScrollRight 
                ? 'bg-white border-gray-300 text-gray-400 cursor-not-allowed' // État Inactif
                : 'bg-[var(--landing-dark)] border-[var(--landing-dark)] text-white hover:bg-black' // État Actif
              }`}
          >
            {/* Flèche Droite SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
        </div>
      </div>

      {/* CONTENEUR DES CARTES (Carrousel) */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex w-full gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 scroll-smooth"
        // Le CSS en ligne ci-dessous permet de masquer la barre de défilement (scrollbar) moche
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
      >
        {/* On masque la scrollbar webkit via du CSS en ligne rapide (tu peux aussi le mettre dans globals.css) */}
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />

       {features.map((feature) => (
  <div 
    key={feature.id}
    // Changement : w-[600px] pour être moins large, min-h-[400px] pour moins haut
    className="flex flex-col shrink-0 snap-start w-[85vw] md:w-[650px] min-h-[450px] rounded-[40px] p-6 md:p-8"
    style={{ backgroundColor: feature.bgColor }}
  >
    {/* ZONE IMAGE (Haut) */}
    {/* Changement : h-48 ou h-56 pour limiter la place prise par l'image */}
    <div className="w-full h-80 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
      <Image 
        src={feature.imageSrc} 
        alt={feature.title} 
        width={600} 
        height={400} 
        className="w-full h-full object-contain"
      />
    </div>

    {/* ZONE TEXTE (Bas) */}
    <div>
      <h3 className="text-xl font-bold mb-1 text-[var(--landing-dark)]">
        {feature.title}
      </h3>
      <p className="font-semibold text-md text-[var(--landing-dark)] mb-2">
        {feature.subtitle}
      </p>
      <p className="text-[var(--landing-dark)]/80 leading-relaxed text-sm">
        {feature.description}
      </p>
    </div>
  </div>
))}

      </div>
    </section>
  );
}