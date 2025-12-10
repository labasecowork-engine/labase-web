/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utilities";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, children, className }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    // Crear el portal al body del documento
    const modalContent = (
      <div
        ref={ref}
        className="fixed inset-0 flex items-center justify-center bg-black/80 w-full z-50 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={cn("relative w-full h-full", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-200 text-lg hover:text-stone-100 transition-colors"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );

    // Usar createPortal para renderizar fuera de la jerarquía normal
    return createPortal(modalContent, document.body);
  },
);

Modal.displayName = "Modal";

export interface ModalTriggerProps {
  triggerText: string;
  children: React.ReactNode;
  triggerClassName?: string;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({
  triggerText,
  children,
  triggerClassName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className={triggerClassName || "rounded-full bg-transparent border"}
      >
        {triggerText}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {children}
      </Modal>
    </>
  );
};

export { Modal, ModalTrigger };
