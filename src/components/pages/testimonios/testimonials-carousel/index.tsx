import { useState, useEffect, useRef } from "react";
import { cn } from "@/utilities";
import NavigationButtons from "../../shared/button-arrow/button.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { routes } from "@/config/index.ts";

// Tipos de datos
interface Testimonial {
  id: string;
  text: string;
  author: string;
  source: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    text: "Este coworking superó mis expectativas. El ambiente es increíblemente inspirador y siempre hay alguien dispuesto a ayudarte o darte feedback. ¡Perfecto para freelancers como yo!",
    author: "Andrea Torres",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "2",
    text: "La comunidad aquí es lo mejor. Gracias a las actividades y eventos de networking, he hecho colaboraciones que nunca habría imaginado. ¡No es solo un lugar para trabajar, es una red de oportunidades!",
    author: "Carlos Mendoza",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "3",
    text: "Como emprendedora, necesitaba un lugar con buena conexión y salas de reuniones. Aquí encontré eso y mucho más. El equipo es súper atento y las instalaciones están siempre impecables.",
    author: "Lucía Ramírez",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "4",
    text: "Trabajo remoto y he probado varios espacios, pero este es mi favorito. Hay luz natural, buena vibra y café ilimitado. La productividad fluye sin esfuerzo.",
    author: "Julián Pérez",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "5",
    text: "Me encanta venir cada día. Es un espacio que combina profesionalismo con calidez. Además, el diseño interior está pensado para que te sientas cómodo y enfocado.",
    author: "Elena Suárez",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "6",
    text: "Lo que más valoro es la flexibilidad: puedo reservar salas, cambiar de escritorio o usar las cabinas privadas para videollamadas. ¡Ideal para mi rutina híbrida!",
    author: "David Ríos",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "7",
    text: "Desde que me uní, mi productividad se ha duplicado. Aquí no hay distracciones y siempre hay una energía positiva en el aire. ¡Muy recomendado!",
    author: "Paula Castaño",
    source: "Opiniones en Google",
    rating: 5,
  },
  {
    id: "8",
    text: "Un espacio que entiende las necesidades de los creativos. Hay áreas comunes para relajarse, buena música ambiental y hasta talleres semanales. ¡Una joya en la ciudad!",
    author: "Marco Vélez",
    source: "Opiniones en Google",
    rating: 5,
  },
];

// Función para calcular slides basado en el ancho de ventana
const getSlidesPerView = (width: number): number => {
  if (width < 640) return 1.2;
  if (width < 1024) return 2.2;
  return 3;
};

export default function TestimonialCarousel() {
  const [slidesPerView, setSlidesPerView] = useState<number>(4.5); // Valor por defecto
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = getSlidesPerView(window.innerWidth);
      setSlidesPerView(newSlidesPerView);
    };

    handleResize();

    // Agregar listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={cn(
            "w-5 h-5",
            i < rating ? "text-[#5D4C3C]" : "text-gray-300",
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="w-full bg-white overflow-x-hidden py-16 md:py-24">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto px-8  pb-12">
        <p className="text-stone-600 text-left text-lg tracking-[0.35em] uppercase mb-4">
          Productividad, Comunidad y Café
        </p>
        <h2 className="text-left text-4xl md:text-5xl font-secondary font-bold mt-2 text-stone-950 uppercase">
          Ellos Lo Confirman
        </h2>
      </div>

      {/* Carrusel */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          slidesPerView={1}
          initialSlide={2}
          centeredSlides={true}
          slideToClickedSlide={true}
          grabCursor={true}
          loop={true}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          className="testimonial-swiper overflow-visible"
        >
          {testimonials.map((testimonial: Testimonial, _) => (
            <SwiperSlide
              key={testimonial.id}
              className={cn("transition-transform duration-300")}
            >
              <div className="p-2">
                <div className="h-auto min-h-[400px] flex flex-col bg-stone-100 p-8">
                  <div className="pb-3">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-stone-700 italic text-base tracking-widest ">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex-col items-start pt-0 ">
                    <p className="font-semibold text-stone-900 w-full">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-stone-600 w-full">
                      {testimonial.source}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación y botón de acción */}
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <NavigationButtons
            onPrevious={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
          />

          {/* Botón extra */}
          <a
            href={routes.contact}
            className="rounded-full bg-stone-500 px-10 py-3 md:py-4 text-sm font-semibold text-white shadow-xs hover:bg-stone-400 hover:text-white tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400 w-full sm:w-fit text-center uppercase"
          >
            CONTACTANOS
          </a>
        </div>
      </div>
    </div>
  );
}
