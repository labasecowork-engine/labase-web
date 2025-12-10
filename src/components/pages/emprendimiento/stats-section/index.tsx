import { useState, useEffect } from "react";

// Tipos de datos
interface StatItemProps {
  endValue: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const StatItem = ({
  endValue,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
}: StatItemProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | undefined;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [endValue, duration]);

  // Format large numbers with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const statId = `stat-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      className="flex flex-col items-center p-2 md:p-6"
      role="region"
      aria-labelledby={statId}
    >
      <h2
        id={statId}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-serif"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">Valor estadístico: </span>
        {prefix}
        {formattedCount}
        {suffix}
      </h2>
      <p
        className="mt-2 text-sm md:text-base text-stone-600 text-center"
        aria-description={`Descripción de la estadística: ${label}`}
      >
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section
      className="w-full py-12 px-4"
      aria-label="Estadísticas de impacto"
      role="region"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Lista de estadísticas"
        >
          <StatItem endValue={3500} label="Profesionales y emprendedores" />
          <StatItem endValue={55000} prefix="S/" label="Capital financiado" />
          <StatItem prefix="+" endValue={150} label="Eventos y formación" />
          <StatItem endValue={40} label="Nuevos empleos" />
        </div>
      </div>
    </section>
  );
}
