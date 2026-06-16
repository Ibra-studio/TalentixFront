"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EmailCTAProps {
  /** Taille du composant — "default" pour le hero, "sm" pour les sections secondaires */
  size?: "default" | "sm";
  placeholder?: string;
  ctaLabel?: string;
}

export default function EmailCTA({
  size = "default",
  placeholder = "Votre@email.pro",
  ctaLabel = "Commencer gratuitement 🚀",
}: EmailCTAProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isValid = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid(email)) {
      setError("Entrez une adresse e-mail professionnelle valide.");
      return;
    }
    setError("");
    // Passe l'email pré-rempli à la page d'inscription
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  const isSmall = size === "sm";

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-center gap-0 w-full max-w-[600px] mx-auto
          rounded-full overflow-hidden
          ${isSmall ? "h-12" : "h-[60px]"}
        `}
        style={{ backgroundColor: "var(--landing-dark)" }}
        noValidate
      >
        {/* Input email */}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder={placeholder}
          aria-label="Adresse e-mail professionnelle"
          className={`
            flex-1 bg-transparent outline-none border-none
            text-white placeholder:text-gray-400
            ${isSmall ? "px-5 text-sm" : "px-6 text-base"}
          `}
        />

        {/* Bouton CTA */}
        <button
          type="submit"
          className={`
            shrink-0 font-semibold rounded-full transition-colors duration-200
            ${isSmall ? "px-5 text-sm h-9 mr-1.5" : "px-6 text-sm h-11 mr-2"}
          `}
          style={{
            backgroundColor: "var(--landing-accent)",
            color: "var(--landing-dark)",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.backgroundColor =
              "var(--landing-accent-hover)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.backgroundColor =
              "var(--landing-accent)")
          }
        >
          {ctaLabel}
        </button>
      </form>

      {/* Message d'erreur accessible */}
      {error && (
        <p
          role="alert"
          className="mt-2 text-center text-sm"
          style={{ color: "#FF5C35" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}