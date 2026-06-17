"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { MenuToggleIcon } from "@/components/ui/MenuToggleIcon";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Solutions", href: "/#solutions", hasDropdown: true },
  { label: "Tarifs", href: "/pricing", hasDropdown: false },
  { label: "Ressources", href: "/blog", hasDropdown: false },
];

const SOLUTIONS_ITEMS = [
  {
    icon: "🎯",
    title: "Scoring IA des CV",
    description: "Classez automatiquement vos candidats par pertinence",
  },
  {
    icon: "📋",
    title: "Pipeline de recrutement",
    description: "Visualisez chaque candidature à chaque étape",
  },
  {
    icon: "🌐",
    title: "Page Carrière",
    description: "Créez votre vitrine employeur en quelques minutes",
  },
  {
    icon: "📱",
    title: "Paiement Mobile Money",
    description: "Wave, Orange Money, MTN MoMo — intégrés nativement",
  },
];

export default function Navbar() {
  const scrolled = useScroll(10);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const overlayActive = mobileOpen || solutionsOpen;

  const closeAll = () => {
    setSolutionsOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Overlay sombre */}
      <div
        aria-hidden="true"
        onClick={closeAll}
        className={cn(
          "fixed inset-0 z-40 transition-all duration-300",
          overlayActive
            ? "bg-black/40 backdrop-blur-[2px] pointer-events-auto"
            : "bg-transparent pointer-events-none opacity-0"
        )}
      />

      {/* Header transparent full-width — sert uniquement de positionnement */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300"
        style={{
          paddingTop: scrolled && !overlayActive ? "12px" : "0px",
        }}
      >
        {/*
          Le "pill" — position: relative pour que le dropdown
          en absolute se cale correctement sous lui.
          Au scroll : rétrécit + arrondi + shadow.
          Sans scroll : pleine largeur + border-b simple.
        */}
        <div
          className={cn(
            "relative w-full transition-all duration-300",
            scrolled && !overlayActive
              ? "max-w-[1100px] rounded-[50px] bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-(--landing-border)"
              : "max-w-[1230px] bg-white border-b border-(--landing-border)"
          )}
        >
          {/* Barre principale */}
          <div
            className="flex items-center justify-between px-6"
            style={{ height: "var(--landing-navbar-h)" }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center font-bold text-xl tracking-tight shrink-0"
              style={{ color: "var(--landing-dark)" }}
              aria-label="Talentix — Retour à l'accueil"
              onClick={closeAll}
            >
             <Logo/>
            </Link>

            {/* Nav desktop */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Navigation principale"
            >
              {NAV_LINKS.map((item) =>
                item.hasDropdown ? (
                  <button
                    key={item.label}
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-150",
                      solutionsOpen
                        ? "bg-gray-100 text-(--landing-dark)"
                        : "hover:bg-gray-50 text-(--landing-body-text)"
                    )}
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        solutionsOpen && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-50"
                    style={{ color: "var(--landing-body-text)" }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-2 rounded-full border  transition-colors duration-150 hover:bg-gray-50"
                style={{
                  color: "var(--landing-dark)",
                  borderColor: "var(--landing-button-border)",
                }}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
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
                Commencer gratuitement
              </Link>
            </div>

            {/* Burger mobile */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-150 hover:bg-gray-50"
              style={{ borderColor: "var(--landing-border)" }}
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setSolutionsOpen(false);
              }}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              <MenuToggleIcon
                open={mobileOpen}
                className="w-5 h-5"
                stroke="var(--landing-dark)"
                duration={300}
              />
            </button>
          </div>

          {/*
            Dropdown Solutions
            - absolute top-full : sort juste sous la barre principale
            - left-0 right-0 : épouse la largeur du pill parent (relative)
            - Au scroll : reprend les border-radius bas du pill
          */}
          <div
            className={cn(
              "absolute top-full left-0 right-0 bg-white overflow-hidden transition-all duration-200",
              scrolled && !overlayActive
                ? "rounded-b-2xl border border-t-0 border-[var(--landing-border)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                : "border-b border-[var(--landing-border)]",
              solutionsOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            )}
          >
            <div className="px-6 py-6 grid grid-cols-2 gap-3">
              {SOLUTIONS_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href="/#solutions"
                  onClick={closeAll}
                  className="flex items-start gap-3 p-4 rounded-xl transition-colors duration-150 hover:bg-gray-50 group"
                >
                  <span className="text-xl mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--landing-dark)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm mt-0.5 leading-snug"
                      style={{ color: "var(--landing-muted)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Menu mobile — dans le flux (pas absolute) */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300",
              mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <nav
              className="px-6 pt-3 pb-6 flex flex-col gap-1 border-t"
              style={{ borderColor: "var(--landing-border)" }}
              aria-label="Navigation mobile"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className="text-base font-medium px-3 py-3 rounded-lg transition-colors duration-150 hover:bg-gray-50"
                  style={{ color: "var(--landing-body-text)" }}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className="flex flex-col gap-2 mt-3 pt-3 border-t"
                style={{ borderColor: "var(--landing-border)" }}
              >
                <Link
                  href="/login"
                  className="text-center text-sm font-medium py-2.5 rounded-full border"
                  style={{
                    color: "var(--landing-dark)",
                    borderColor: "var(--landing-border)",
                  }}
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="text-center text-sm font-semibold py-2.5 rounded-full"
                  style={{
                    backgroundColor: "var(--landing-accent)",
                    color: "var(--landing-dark)",
                  }}
                >
                  Commencer gratuitement
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}