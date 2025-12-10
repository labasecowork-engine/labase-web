import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import NavigationButtons from "../../shared/button-arrow/button.tsx";
import { Modal, Image } from "@/components/ui";

import "swiper/css";
import "swiper/css/navigation";
import { contact, routes } from "@/config/index.ts";

// Tipos de datos
interface Property {
  id: string | number;
  title: string;
  description: string;
  images: string[];
  status?: string;
  capacity: number;
  environment: string;
}

interface Props {
  properties: Property[];
}

interface PropertyCardProps {
  property: Property;
  onCardClick: (property: Property) => void;
}

export default function SpacesPriceSection({ properties }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <section className="w-full mt-8 mx-auto pb-12 md:pb-24 ">
        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            speed={2000}
            autoplay={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 2.8 },
            }}
            onSwiper={setSwiper}
            className="w-full"
          >
            {properties.map((property: Property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} onCardClick={openModal} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 gap-4 px-8 mx-auto max-w-7xl">
            <NavigationButtons
              onPrevious={() => swiper?.slidePrev()}
              onNext={() => swiper?.slideNext()}
            />

            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href={routes.contact}
                className="bg-stone-500 rounded-full w-fit text-stone-100 py-3 sm:py-4 px-8 sm:px-12 transition-colors duration-200 text-xs sm:text-sm tracking-widest font-medium uppercase hover:bg-stone-400 "
              >
                CONTACTANOS
              </a>
              <a
                href={contact.admin}
                target="_blank"
                className="bg-stone-800 rounded-full w-fit text-stone-100 py-3 sm:py-4 px-8 sm:px-12 transition-colors duration-200 text-xs sm:text-sm tracking-widest font-medium uppercase hover:bg-stone-600 "
              >
                RESERVAR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal con carousel */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="w-[90vw] mx-auto pt-10 px-4 flex items-center justify-center h-fit"
      >
        {selectedProperty && (
          <div className="bg-stone-900  overflow-hidden w-full mt-4">
            <div className="relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                navigation={{
                  nextEl: ".swiper-button-next-modal",
                  prevEl: ".swiper-button-prev-modal",
                }}
                className="h-[80vh]"
              >
                {selectedProperty.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image}
                      alt={`${selectedProperty.title} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Botones de navegación personalizados */}
              <button className="swiper-button-prev-modal absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="swiper-button-next-modal absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function PropertyCard({ property, onCardClick }: PropertyCardProps) {
  return (
    <>
      <div
        className="group flex flex-col h-[650px] bg-stone-800 overflow-hidden hover:bg-[#82674E] transition cursor-pointer relative"
        onClick={() => onCardClick(property)}
      >
        <div className="relative overflow-hidden h-full">
          <p className="text-2xl sm:text-3xl md:text-4xl font-secondary font-medium text-white mb-4 absolute z-20 bottom-0 left-4">
            {property.title}
          </p>
          {property.status && (
            <div className="absolute top-4 right-4 z-10 bg-stone-800 bg-opacity-75 text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-md">
              {property.status}
            </div>
          )}
          <Image
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 "
          />
          <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/70 to-transparent  transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <p
            className="text-sm sm:text-base text-white/60 mb-5"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {property.description}
          </p>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-white uppercase font-medium">
            <span>{property.capacity} PERSONAS</span>
            <span className="w-1 h-1 rounded-full bg-stone-400 uppercase"></span>
            <span>{property.environment}</span>
          </div>
        </div>
      </div>
    </>
  );
}
