import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import { routes } from "@/config";

const StyledSwiperWrapper = styled.div`
  .swiper-container {
    position: relative;
    width: 100%;
    height: 850px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
  .swiper-slide {
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .swiper-slide-prev {
    justify-content: flex-end;
    text-align: center;
    opacity: 0.4;
  }

  .swiper-slide-active {
    justify-content: center;
    text-align: center;
  }

  .swiper-slide-next {
    justify-content: flex-start;
    text-align: center;
    opacity: 0.4;
  }

  .swiper-slide-next .slide-button-action {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s all;
  }
  .swiper-slide-active .slide-button-action {
    opacity: 1;
    transition: 0.3s all;
  }

  .swiper-slide-prev .slide-button-action {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s all;
  }

  .slide-content {
    width: 100%;
    height: 850px;
    position: relative;
    margin: auto;
    z-index: 10;
  }

  .slide-title,
  .slide-subtitle {
    z-index: 20;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    width: 100%;
    text-align: center;
  }

  .slide-title {
    margin-bottom: 0;
  }

  .slide-subtitle {
    margin-top: 0;
  }

  .swiper-slide-prev .slide-title,
  .swiper-slide-prev .slide-subtitle,
  .swiper-slide-prev .action-button {
    text-align: center;
  }

  .swiper-slide-active .slide-title,
  .swiper-slide-active .slide-subtitle,
  .swiper-slide-active .action-button {
    text-align: center;
  }

  .swiper-slide-next .slide-title,
  .swiper-slide-next .slide-subtitle,
  .swiper-slide-next .action-button {
    text-align: center;
  }

  .swiper-pagination {
    display: none !important;
  }

  .flash-animation {
    animation: flash-effect 0.3s ease-in-out;
  }

  @keyframes flash-effect {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 0.7;
    }
    60% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  .slide-inner {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .swiper-slide-prev .slide-inner {
    align-items: flex-end;
  }

  .swiper-slide-active .slide-inner {
    align-items: center;
  }

  .swiper-slide-next .slide-inner {
    align-items: flex-start;
  }

  /* Estilos específicos para botones blancos separados en spaces-section */
  .spaces-white-button {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    transition: all 0.3s ease;
    color: white;
    @media (min-width: 1024px) {
      width: 80px;
      height: 80px;
    }
  }

  .spaces-white-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spaces-white-button:disabled:hover {
    transform: none;
  }

  .spaces-white-button:disabled .arrow-line,
  .spaces-white-button:disabled .arrow-head {
    transition: none;
  }

  .spaces-white-button:focus {
    outline: none;
  }

  .spaces-white-button:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  .spaces-white-button:hover:not(:disabled) {
    transform: scale(0.7);
  }

  .spaces-white-button .arrow-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 14px;
    height: 3px;
    @media (min-width: 1024px) {
      width: 28px;
      height: 3px;
    }
  }

  .spaces-white-button .arrow-line {
    position: absolute;
    width: 14px;
    height: 1px;
    background-color: white;
    border-radius: 1.5px;
    transition: all 0.4s ease;
    @media (min-width: 1024px) {
      width: 28px;
      height: 1px;
    }
  }

  .spaces-white-button .prev-line {
    left: 0;
    transform-origin: right center;
  }

  .spaces-white-button .next-line {
    left: 0;
    transform-origin: left center;
  }

  .spaces-white-button .arrow-head {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    transition:
      transform 0.4s ease,
      color 0.4s ease;
    color: white;
    width: 8px;
    height: 15px;
  }

  .spaces-white-button .prev-head {
    left: -2px;
    transform: translateY(-50%) rotate(180deg);
  }

  .spaces-white-button .next-head {
    top: 2px;
    right: -2px;
    transform: translateY(-50%);
  }

  .spaces-white-button.prev-button:hover:not(:disabled) .prev-line {
    transform: scaleX(3.5);
    background-color: white;
  }

  .spaces-white-button.prev-button:hover:not(:disabled) .prev-head {
    transform: translateY(-50%) translateX(-36px) rotate(180deg);
    color: white;
    @media (min-width: 1024px) {
      transform: translateY(-50%) translateX(-70px) rotate(180deg);
    }
  }

  .spaces-white-button.prev-button:focus-visible:not(:disabled) .prev-line {
    transform: scaleX(3.5);
    background-color: white;
  }

  .spaces-white-button.prev-button:focus-visible:not(:disabled) .prev-head {
    transform: translateY(-50%) translateX(-36px) rotate(180deg);
    color: white;
    @media (min-width: 1024px) {
      transform: translateY(-50%) translateX(-70px) rotate(180deg);
    }
  }

  .spaces-white-button.next-button:hover:not(:disabled) .next-line {
    transform: scaleX(3.5);
    background-color: white;
  }

  .spaces-white-button.next-button:hover:not(:disabled) .next-head {
    transform: translateY(-50%) translateX(36px);
    color: white;
    @media (min-width: 1024px) {
      transform: translateY(-50%) translateX(70px);
    }
  }

  .spaces-white-button.next-button:focus-visible:not(:disabled) .next-line {
    transform: scaleX(3.5);
    background-color: white;
  }

  .spaces-white-button.next-button:focus-visible:not(:disabled) .next-head {
    transform: translateY(-50%) translateX(36px);
    color: white;
    @media (min-width: 1024px) {
      transform: translateY(-50%) translateX(70px);
    }
  }

  .spaces-white-button:active:not(:disabled) {
    transform: scale(0.9);
  }
`;

export default function SpacesSection() {
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [realIndex, setRealIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Generamos IDs únicos para las relaciones ARIA
  const sectionId = `spaces-section-${Math.random().toString(36).substr(2, 9)}`;
  const sliderId = `spaces-slider-${Math.random().toString(36).substr(2, 9)}`;

  const slides = [
    {
      id: 1,
      image: "/images/espacios/el_hangar/3.webp",
      content: "EL",
      subcontent: "HANGAR",
      button: "DESATA TU CREATIVIDAD",
      alt: "Vista del espacio El Hangar, área creativa de La Base",
    },
    {
      id: 2,
      image: "/images/espacios/base_de_mando/4.webp",
      content: "BASE",
      subcontent: "DE MANDO",
      button: "TRABAJA CON TU EQUIPO",
      alt: "Vista de la Base de Mando, espacio colaborativo para equipos",
    },
    {
      id: 3,
      image: "/images/espacios/base_operativa/1.webp",
      content: "BASE",
      subcontent: "OPERATIVA",
      button: "OPTIMIZA TU PRODUCTIVIDAD",
      alt: "Vista de la Base Operativa, espacio para optimizar la productividad",
    },
    {
      id: 4,
      image: "/images/espacios/bunkers/13.webp",
      content: "LOS",
      subcontent: "BUNKERS",
      button: "RESERVA TU ESPACIO PRIVADO",
      alt: "Vista de los bunkers, espacio privado para reservas",
    },
    {
      id: 5,
      image: "/images/espacios/la_brigada/6.webp",
      content: "LA",
      subcontent: "BRIGADA",
      button: "ÚNETE A LA COMUNIDAD",
      alt: "Vista de la Brigada, espacio para unirse a la comunidad",
    },
    {
      id: 6,
      image: "/images/espacios/sala_de_recepcion/6.webp",
      content: "RECEPCIONES",
      subcontent: "",
      button: "ENTRA Y DESCUBRE MÁS",
      alt: "Vista de las recepciones, espacio para entrar y descubrir más",
    },
    {
      id: 8,
      image: "/images/espacios/unidades/7.webp",
      content: "UNIDADES",
      subcontent: "",
      button: "ENCUENTRA TU ESPACIO",
      alt: "Vista de las unidades, espacio para encontrar tu espacio",
    },
    {
      id: 8,
      image: "/images/espacios/arsenal/14.webp",
      content: "EL",
      subcontent: "ARSENAL",
      button: "ACCEDER A RECURSOS",
      alt: "Vista del Arsenal, espacio para acceder a recursos",
    },
    {
      id: 9,
      image: "/images/espacios/phone_booth/2.webp",
      content: "LOS",
      subcontent: "PHONEBOOTS",
      button: "RESERVA YA",
      alt: "Vista de los Phoneboots, espacio para reservar ya",
    },
    {
      id: 9,
      image: "/images/espacios/reserva/8.webp",
      content: "RESERVAS",
      subcontent: "",
      button: "HAZ TU RESERVA",
      alt: "Vista de las reservas, espacio para hacer tu reserva",
    },
  ];

  useEffect(() => {
    setIndex(realIndex);
  }, [realIndex]);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsFlashing(true);
    setRealIndex(swiper.realIndex);
    setTimeout(() => setIsFlashing(false), 1200);
  };
  return (
    <StyledSwiperWrapper>
      <section
        id={sectionId}
        role="region"
        aria-label="Espacios de La Base"
        className="relative"
      >
        <div className="swiper-container">
          <div
            className="w-full h-full z-[5] bg-black/80 absolute left-0 top-0"
            aria-hidden="true"
          ></div>
          <div
            className={isFlashing ? "flash-animation" : ""}
            style={{
              backgroundImage: `url(${slides[index].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "850px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              transition: "background-image 0.3s ease",
              zIndex: -1,
              filter: "sepia(30%) brightness(110%) contrast(105%)",
            }}
            role="img"
            aria-label={slides[index].alt}
          ></div>

          <div className="absolute top-[85%] left-[100px] transform -translate-y-1/2 z-20">
            <button
              className="nav-button prev-button spaces-white-button"
              aria-label="Ver espacio anterior"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-controls={sliderId}
            >
              <div className="arrow-container">
                <span
                  className="arrow-line prev-line"
                  aria-hidden="true"
                ></span>
                <svg
                  className="arrow-head prev-head"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1.23075 14.1201L0.342285 13.1714L5.56728 7.72195H5.5V6.39819H5.56728L0.342285 0.948696L1.23075 0L7.99998 7.06007L1.23075 14.1201Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>

          <div className="absolute top-[85%] right-[100px] transform -translate-y-1/2 z-20">
            <button
              className="nav-button next-button spaces-white-button"
              aria-label="Ver siguiente espacio"
              onClick={() => swiperRef.current?.slideNext()}
              aria-controls={sliderId}
            >
              <div className="arrow-container">
                <span
                  className="arrow-line next-line"
                  aria-hidden="true"
                ></span>
                <svg
                  className="arrow-head next-head"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1.23075 14.1201L0.342285 13.1714L5.56728 7.72195H5.5V6.39819H5.56728L0.342285 0.948696L1.23075 0L7.99998 7.06007L1.23075 14.1201Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>

          <Swiper
            id={sliderId}
            pagination={true}
            centeredSlides={true}
            modules={[Pagination]}
            onSlideChange={handleSlideChange}
            className="slide-content"
            loop={true}
            speed={1000}
            autoplay={true}
            navigation={{
              prevEl: ".navigation-prev",
              nextEl: ".navigation-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 50,
              },
            }}
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            aria-label="Carrusel de espacios de La Base"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.content} ${slide.subcontent}`.trim()}
              >
                <div className="slide-inner">
                  <h2 className="slide-title uppercase font-secondary text-stone-50 font-bold text-3xl sm:text-8xl">
                    {slide.content}
                  </h2>
                  <h3 className="slide-subtitle uppercase font-secondary text-stone-50 font-bold text-3xl sm:text-8xl">
                    {slide.subcontent}
                  </h3>
                  <div className="slide-button-action w-full mt-14">
                    <a
                      href={routes.contact}
                      className="rounded-full bg-transparent border border-stone-200 lg:px-12 px-6 py-3 lg:py-4 text-xs sm:text-sm font-semibold text-stone-200 shadow-xs hover:bg-stone-200 hover:text-stone-950 tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400"
                      role="button"
                      aria-label={slide.button}
                    >
                      {slide.button}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </StyledSwiperWrapper>
  );
}
