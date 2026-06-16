import EmailCTA from "./EmailCta"
import TrapezeHighlight from "./TrapezeHighlight";

export default function HeroSection() {
  return (
    <section
      aria-label="Section principale"
      className="flex flex-col items-center justify-center text-center px-6"
      style={{
        minHeight: "100dvh",
        paddingTop: "var(--landing-navbar-h)",
      }}
    >
      <div className="max-w-full mx-auto flex flex-col items-center gap-6">

        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: "var(--landing-tag-bg)",
            color: "var(--landing-tag-text)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--landing-tag-text)" }}
            aria-hidden="true"
          />
          Logiciel de recrutement
        </div>

        {/* H1 */}
        <h1
          className="font-bold leading-[1.15] tracking-tight w-full"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)",
            color: "var(--landing-dark)",
          }}
        >
          Arrêtez de perdre{" "}
          {/*
            Le span "20h" avec effet trapèze :
            - position relative pour contenir le ::before absolu
            - le ::before est le fond bleu trapézoïdal (CSS inline via style tag)
            - le texte passe au-dessus grâce à z-index
          */}
          <TrapezeHighlight>
            20h
          </TrapezeHighlight>
          {" "}par semaine sur des
          <br />
          candidatures qui ne mènent nulle part
        </h1>

        {/* Description */}
        <p
          className="text-lg leading-relaxed max-w-4xl"
          style={{ color: "var(--landing-body-text)" }}
        >
          Talentix africa est le #1 logiciel de recrutement en Afrique francophone dedié uniquement au recrutement .
         <br/>Conçu spécialement pour les recruteurs africains qui refusent que le prochain talent de leur entreprise leur échappe à cause d&apos;un process dépassé.
        </p>

        {/* CTA */}
        <div className="w-full mt-2">
          <EmailCTA />
        </div>

        {/* Preuve sociale */}
        <p className="text-sm" style={{ color: "var(--landing-muted)" }}>
          *c'est Gratuit , sans engagements . Démarrage en 2 minutes
        </p>

      </div>
    </section>
  );
}