import React from "react";
import { menuItems } from "../../../data/menu-items";
import type { NavbarProps } from "../../../types";

interface NavigationHeaderProps extends NavbarProps {
  onOpenMenu: () => void;
  isStartPage: boolean;
  isHeaderVisible: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  isTransparent = true,
  onOpenMenu,
  isStartPage,
  isHeaderVisible,
}) => {
  return (
    <header
      className={`fixed inset-x-0 z-40 transition-all ease-linear duration-300 text-white ${
        isHeaderVisible ? "top-0" : "-top-[150px]"
      }`}
      style={{
        backgroundColor: isStartPage
          ? isTransparent === false
            ? "#1c1917"
            : "transparent"
          : "#1c1917",
      }}
      role="banner"
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        role="navigation"
        aria-label="Navegación principal"
      >
        <a
          href="/"
          className="-m-1.5 p-1.5"
          aria-label="Ir a la página de inicio"
        >
          <img
            src="/logo.png"
            alt="La BaseCowork"
            className="lg:h-16 lg:w-52 w-32 h-10 object-cover"
            loading="lazy"
          />
        </a>

        <div className="flex items-center">
          <div
            className="hidden lg:flex gap-x-10 items-center"
            role="menubar"
            aria-label="Menú principal"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-widest uppercase text-white"
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            onClick={onOpenMenu}
            className="ml-4 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-white"
            aria-label="Abrir menú principal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};
