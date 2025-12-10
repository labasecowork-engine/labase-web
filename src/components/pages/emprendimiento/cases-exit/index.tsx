import { useState, useEffect } from "react";

// Tipos de datos
interface CaseItem {
  id: string | number;
  imageUrl: string;
  logoUrl: string;
  companyName: string;
  tagline: string;
  description: string;
}

interface CaseCardProps {
  caseItem: CaseItem;
}

interface CasosExitoSectionProps {
  title?: string;
  subtitle?: string;
  cases: CaseItem[];
}

function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <article
      className="flex flex-col"
      role="article"
      aria-labelledby={`case-title-${caseItem.id}`}
    >
      <div
        className="relative overflow-hidden mb-4 sm:mb-6 h-96"
        role="img"
        aria-label={`Imagen destacada de ${caseItem.companyName}`}
      >
        <img
          src={caseItem.imageUrl}
          alt={`Caso de éxito: ${caseItem.companyName} - ${caseItem.tagline}`}
          className="w-full h-full object-cover "
          loading="lazy"
        />
      </div>

      <div
        className="mb-3 sm:mb-4 h-10"
        role="img"
        aria-label={`Logo de ${caseItem.companyName}`}
      >
        <img
          src={caseItem.logoUrl}
          alt={`Logo de ${caseItem.companyName}`}
          className="h-full w-auto object-contain grayscale"
          loading="lazy"
        />
      </div>
      <h3
        id={`case-title-${caseItem.id}`}
        className="text-stone-900 text-md sm:text-lg font-bold mb-2 sm:mb-3 font-secondary"
      >
        {caseItem.tagline}
      </h3>

      <p className="text-stone-600 text-sm sm:text-base mb-3 sm:mb-4">
        {caseItem.description}
      </p>
    </article>
  );
}

export default function CasosExitoSection({
  title = "Casos de éxito",
  subtitle = "Clientes que crecen",
  cases,
}: CasosExitoSectionProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !cases || cases.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full bg-stone-100 py-12 sm:py-16 md:py-24"
      aria-labelledby="section-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          role="heading"
          aria-level={1}
        >
          <h3
            className="text-sm sm:text-base text-stone-600 uppercase tracking-widest font-medium"
            id="section-subtitle"
          >
            {title}
          </h3>
          <h2
            className="text-3xl uppercase font-bold sm:text-4xl md:text-5xl font-secondary mt-1 sm:mt-2 font-stone-900"
            id="section-title"
          >
            {subtitle}
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          role="list"
          aria-label="Lista de casos de éxito"
        >
          {cases.map((caseItem: CaseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center items-center mt-10 sm:mt-12 md:mt-16 gap-4 sm:gap-6"
          role="group"
          aria-label="Opciones de contacto"
        >
          <a
            href="#"
            className="bg-stone-500 rounded-full w-full sm:w-fit text-white py-3 px-10 sm:py-4 sm:px-12 transition-colors duration-200 text-xs sm:text-sm tracking-widest font-medium uppercase text-center"
            role="button"
            aria-label="Comenzar ahora"
          >
            Comienza ahora mismo
          </a>
          <a
            href="#"
            className="border border-stone-700 rounded-full w-full sm:w-fit text-stone-900 py-3 px-10 sm:py-4 sm:px-12 transition-colors duration-200 text-xs sm:text-sm tracking-widest font-medium uppercase text-center"
            role="button"
            aria-label="Agendar una demostración"
          >
            Agendar una demo
          </a>
        </div>
      </div>
    </section>
  );
}
