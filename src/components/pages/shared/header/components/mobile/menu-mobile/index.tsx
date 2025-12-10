import React, { useState } from "react";
import { accordionSections, secondaryLinks } from "../../../data";
import { MobileFooter } from "../mobile-footer";
import { routes, social } from "@/config";

export const MobileMenu: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (sectionNumber: number) => {
    if (expandedSection === sectionNumber) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionNumber);
    }
  };

  return (
    <>
      <div className="flex flex-col px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="space-y-4 overflow-y-auto">
          {/*
          {accordionSections.map((section, index) => (
            <div key={index} className="pb-4">
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between w-full text-left py-3 pr-2 lg:pr-0"
                role="menuitem"
                tabIndex={0}
              >
                <span className="text-xl font-secondary text-stone-100 capitalize">
                  {section.title}
                </span>
                <svg
                  className={`w-4 h-4 text-stone-100 transition-transform duration-300 ${
                    expandedSection === index ? "rotate-180" : ""
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
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSection === index ? "max-h-80 mt-2" : "max-h-0"
                }`}
              >
                <div className="space-y-2 pl-4 pb-2">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href="#"
                      className="block text-base font-secondary text-stone-300 hover:text-stone-100 transition-colors capitalize py-1"
                      role="menuitem"
                      tabIndex={0}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))} */}

          <div className="border-t border-stone-700 pt-6 mt-6">
            <div className="space-y-3 mb-6">
              {secondaryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-lg font-secondary text-stone-100 hover:opacity-80 transition-opacity"
                  role="menuitem"
                  tabIndex={0}
                >
                  {link.label}
                </a>
              ))}

              <a
                href={routes.blog}
                className="block text-lg font-secondary text-stone-100 hover:opacity-80 transition-opacity"
                role="menuitem"
                tabIndex={0}
              >
                Nuestro Blog
              </a>

              <a
                href={routes.emprendimiento}
                className="block text-lg font-secondary text-stone-100 hover:opacity-80 transition-opacity"
                role="menuitem"
                tabIndex={0}
              >
                Emprendimiento
              </a>
              <a
                href={routes.arsenal}
                className="block text-lg font-secondary text-stone-100 hover:opacity-80 transition-opacity"
                role="menuitem"
                tabIndex={0}
              >
                El Arsenal
              </a>
              <a
                href={social.linkedin.url}
                className="block text-lg font-secondary text-stone-100 hover:opacity-80 transition-opacity"
                role="menuitem"
                tabIndex={0}
              >
                Bolsa de trabajo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <MobileFooter />
      </div>
    </>
  );
};
