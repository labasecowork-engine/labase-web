import React from "react";

interface CloseButtonProps {
  onClose: () => void;
  isAnimatingRef: React.MutableRefObject<boolean>;
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(({ onClose, isAnimatingRef }, ref) => {
  return (
    <button
      ref={ref}
      onClick={() => !isAnimatingRef.current && onClose()}
      className="fixed top-6 right-6 lg:top-8 lg:right-8 z-[70] text-white p-2 focus:outline-none cursor-pointer"
      aria-label="Cerrar menú principal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
});

CloseButton.displayName = "CloseButton";
