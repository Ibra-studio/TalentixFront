"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EmailCTAProps {
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
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  const isSmall = size === "sm";

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0"
      >
        {/*
          Mobile  : input + bouton empilés verticalement, chacun rounded-full
          Desktop : input + bouton côte à côte dans un seul pill sombre
        */}

        {/* Conteneur pill — visible seulement sur sm+ */}
        <div
          className={`
            hidden sm:flex items-center w-full overflow-hidden rounded-full
            ${isSmall ? "h-12" : "h-[60px]"}
          `}
          style={{ backgroundColor: "var(--landing-dark)" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
            placeholder={placeholder}
            aria-label="Adresse e-mail professionnelle"
            className={`
              flex-1 bg-transparent outline-none border-none
              text-white placeholder:text-gray-400
              ${isSmall ? "px-5 text-sm" : "px-6 text-base"}
            `}
          />
          <button
            type="submit"
            className={`
              shrink-0 font-semibold rounded-full transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              ${isSmall ? "px-5 text-sm h-9 mr-1.5" : "px-6 text-sm h-11 mr-2"}
            `}
            style={{
              backgroundColor: "var(--landing-accent)",
              color: "var(--landing-dark)",
            }}
          >
            {ctaLabel}
          </button>
        </div>

        {/* Layout mobile — input et bouton séparés, empilés */}
        <div className="flex sm:hidden flex-col gap-2 w-full">
          <div
            className="flex items-center w-full h-12 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--landing-dark)" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              placeholder={placeholder}
              aria-label="Adresse e-mail professionnelle"
              className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400 px-5 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
            style={{
              backgroundColor: "var(--landing-accent)",
              color: "var(--landing-dark)",
            }}
          >
            {ctaLabel}
          </button>
        </div>
      </form>

      {/* Erreur */}
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