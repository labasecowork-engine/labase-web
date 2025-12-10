import React, { useState } from "react";
import type { AccordionSection } from "../../../types";

interface AccordionSectionProps {
  section: AccordionSection;
}

export const AccordionSectionComponent: React.FC<AccordionSectionProps> = ({
  section,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-stone-700">
      <button
        onClick={toggleSection}
        className="w-full flex items-center justify-between py-3 pr-2 lg:pr-0 text-left"
        aria-expanded={isExpanded}
        aria-controls={`accordion-${section.title}`}
      >
        <span className="text-xl font-medium text-stone-100 capitalize">
          {section.title}
        </span>
        <svg
          className={`w-4 h-4 text-stone-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id={`accordion-${section.title}`}
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-4 space-y-3">
          {section.links.map((link, index) => (
            <a
              key={index}
              href="#"
              className="block text-stone-300 hover:text-stone-100 transition-colors capitalize pl-4"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
