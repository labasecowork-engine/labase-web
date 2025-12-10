import "./style.css";

// Tipos de datos
interface ArrowIconProps {
  direction: "next" | "prev";
  className?: string;
}

interface NavigationButtonsProps {
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}

const ArrowIcon = ({ direction, className = "" }: ArrowIconProps) => {
  const isNext = direction === "next";

  return (
    <svg
      className={className}
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <path
        d="M1.23075 14.1201L0.342285 13.1714L5.56728 7.72195H5.5V6.39819H5.56728L0.342285 0.948696L1.23075 0L7.99998 7.06007L1.23075 14.1201Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function NavigationButtons({
  className = "",
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  ariaLabel = "Navegación",
  previousLabel = "Ir al elemento anterior",
  nextLabel = "Ir al elemento siguiente",
}: NavigationButtonsProps) {
  return (
    <div
      className={`nav-buttons-container ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {/* Previous button */}
      <button
        className="nav-button prev-button"
        aria-label={previousLabel}
        onClick={onPrevious}
        disabled={disablePrevious}
        aria-disabled={disablePrevious}
        type="button"
      >
        <div className="arrow-container" aria-hidden="true">
          <span className="arrow-line prev-line" aria-hidden="true"></span>
          <ArrowIcon direction="prev" className="arrow-head prev-head" />
        </div>
      </button>

      {/* Next button */}
      <button
        className="nav-button next-button"
        aria-label={nextLabel}
        onClick={onNext}
        disabled={disableNext}
        aria-disabled={disableNext}
        type="button"
      >
        <div className="arrow-container" aria-hidden="true">
          <span className="arrow-line next-line" aria-hidden="true"></span>
          <ArrowIcon direction="next" className="arrow-head next-head" />
        </div>
      </button>
    </div>
  );
}
