// components/landing/TrapezoidHighlight.tsx
// ─────────────────────────────────────────────────────────────
// Composant réutilisable pour le mot encadré en trapèze.
// Usage :
//   <TrapezoidHighlight>20h</TrapezoidHighlight>
//   <TrapezoidHighlight color="#FDE68A" angle={6}>rapide</TrapezoidHighlight>
// ─────────────────────────────────────────────────────────────

interface TrapezeHighlightProps {
  children: React.ReactNode;

  /** Couleur du fond du trapèze — défaut : bleu clair */
  color?: string;

  /** Angle de rotation en degrés — plus grand = trapèze plus prononcé */
  angle?: number;

  /** Distance de perspective en px — plus petit = effet plus fort */
  perspective?: number;

  /** Classe CSS additionnelle sur le span wrapper */
  className?: string;
}

export default function TrapezeHighlight({
  children,
  color = "#BFDBFE",
  angle = 4,
  perspective = 60,
  className = "",
}: TrapezeHighlightProps) {
  // ID unique pour le style scoped — évite les collisions si
  // plusieurs instances sont sur la même page
  const uid = `th-${color.replace("#", "")}-${angle}`;

  return (
    <>
      <span className={`${uid} ${className}`}>
        {children}
      </span>

      {/* Style scoped généré dynamiquement selon les props */}
      <style>{`
        .${uid} {
          position: relative;
          display: inline-block;
          padding: 0 4px;
          z-index: 0;
        }

        .${uid}::before {
          content: '';
          position: absolute;
          inset: -2px -6px;
          background-color: ${color};
          transform: perspective(${perspective}px) rotateX(${angle}deg);
          border-radius: 4px;
          z-index: -1;
        }
      `}</style>
    </>
  );
}