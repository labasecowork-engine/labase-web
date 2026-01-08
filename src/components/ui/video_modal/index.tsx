import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui";

interface VideoModalProps {
  videoSrc?: string;
  buttonText: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const VideoModal = ({
  videoSrc = "/videos/videobase.mp4",
  buttonText,
  buttonClassName,
  children,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}: VideoModalProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Si se proporciona control externo, usarlo; si no, usar estado interno
  const isControlled =
    externalIsOpen !== undefined && externalOnClose !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const openModal = () => {
    if (!isControlled) {
      setInternalIsOpen(true);
    }
  };

  const closeModal = () => {
    if (isControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Sincronizar estado interno cuando se controla externamente
  useEffect(() => {
    if (isControlled && externalIsOpen !== undefined) {
      // No hacer nada, el estado se controla externamente
    }
  }, [isControlled, externalIsOpen]);

  return (
    <>
      {!isControlled && (
        <>
          {children ? (
            <div onClick={openModal} className="cursor-pointer">
              {children}
            </div>
          ) : (
            buttonText && (
              <button
                onClick={openModal}
                className={buttonClassName}
                aria-label={`${buttonText} - Iniciar tour virtual`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="size-4"
                  fill="currentColor"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                <span>{buttonText}</span>
              </button>
            )
          )}
        </>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} className="!p-0">
        <div className="absolute inset-0 w-full h-full bg-black">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors"
            aria-label="Cerrar video"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="size-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z" />
            </svg>
          </button>
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            aria-label="Video tour virtual de La Base"
          >
            <source src={videoSrc} type="video/quicktime" />
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta videos HTML5. Aquí hay un{" "}
            <a href={videoSrc}>enlace al video</a>.
          </video>
        </div>
      </Modal>
    </>
  );
};
