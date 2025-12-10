import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

// Tipos de datos
interface Testimonial {
  id: string | number;
  text: string;
  name: string;
  source: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-stone-50 border border-stone-100 rounded-lg p-4 sm:p-6 h-[280px] flex flex-col">
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-black">
            {" "}
            ★
          </span>
        ))}
      </div>

      <p
        className="text-sm text-stone-700 flex-grow overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        "{testimonial.text}"
      </p>

      <div className="mt-4 pt-4 border-t border-stone-200">
        <p className="font-medium text-stone-900">{testimonial.name}</p>
        <p className="text-xs text-stone-500">{testimonial.source}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  title = "LO QUE DICEN NUESTROS",
  subtitle = "EMPRENDEDORES",
  testimonials,
}: TestimonialsSectionProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (swiper && prevRef.current && nextRef.current) {
      // Verificar que navigation existe y es un objeto antes de acceder a sus propiedades
      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation === "object"
      ) {
        (swiper.params.navigation as any).prevEl = prevRef.current;
        (swiper.params.navigation as any).nextEl = nextRef.current;
      }
      swiper.navigation.destroy(); // Destruir la navegación anterior para responsividad
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]); // Se ejecuta cuando la instancia de Swiper cambia

  if (!isMounted || !testimonials || testimonials.length === 0) {
    // No renderizar nada si no está montado o no hay testimonios
    return null;
  }

  return (
    <>
      <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-16 lg:px-32 xl:px-64 pt-20 md:pt-28 lg:pt-40">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-sm sm:text-base md:text-lg text-stone-600 uppercase tracking-widest font-medium">
            {title}
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mt-2 text-stone-900">
            {subtitle}
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            speed={800}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={setSwiper}
            className="w-full"
          >
            {testimonials.map((testimonial: Testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-0 mt-8 md:mt-10">
            <div className="flex gap-3 sm:gap-4">
              <button
                ref={prevRef}
                className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
              </button>
              <button
                ref={nextRef}
                className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700" />
              </button>
            </div>

            <a
              href="#"
              className="bg-stone-500 rounded-full text-stone-100 py-3 px-6 sm:py-4 sm:px-10 transition-colors duration-200 text-xs sm:text-sm md:text-base tracking-wider font-medium uppercase w-full text-center md:w-auto"
            >
              Ver todos los testimonios
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
