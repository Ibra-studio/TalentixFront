import Link from "next/link";

interface CareersFooterProps {
  organizationName: string;
}

export function CareersFooter({ organizationName }: CareersFooterProps) {
  return (
    <footer
      className="border-t py-6"
      style={{
        borderColor: "var(--landing-border)",
        backgroundColor: "var(--landing-navbar-bg)",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row"
        style={{ maxWidth: "var(--landing-max-w)", color: "var(--landing-muted)" }}
      >
        <span>
          © {new Date().getFullYear()} {organizationName}. Tous droits réservés.
        </span>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline text-lg" style={{ color: "var(--landing-tag-bg)" }}>
            Afficher le site Internet
          </Link>
          <Link href="/aide" className="hover:underline">
            Aide
          </Link>
        </div>

        <span>
          Propulsé par{" "}
          <Link
            href="https://talentix.app"
            className="font-medium hover:underline text-lg"
            style={{ color: "var(--landing-tag-bg)" }}
          >
            Talentix
          </Link>
        </span>
      </div>
    </footer>
  );
}