import React, { useState } from "react";
import {
  NavigationHeader,
  MenuPanels,
  CloseButton,
  DesktopMenu,
  MobileMenu,
} from "./components";
import {
  useResponsiveMenu,
  useMenuAnimation,
  useScrollVisibility,
} from "./hooks";
import type { NavbarProps } from "./types";

const Header: React.FC<NavbarProps> = ({ isTransparent = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsiveMenu();
  const { isHeaderVisible, isStartPage } = useScrollVisibility();
  const {
    isAnimating,
    isAnimatingRef,
    panelsRef,
    contentRef,
    closeButtonRef,
    addPanelRef,
  } = useMenuAnimation(isOpen);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuId = "main-menu";

  return (
    <>
      <NavigationHeader
        isTransparent={isTransparent}
        onOpenMenu={openMenu}
        isStartPage={isStartPage}
        isHeaderVisible={isHeaderVisible}
      />

      <div
        id={menuId}
        className={`fixed inset-0 z-50 ${
          isOpen || isAnimating ? "block" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
      >
        <MenuPanels addPanelRef={addPanelRef} />

        <CloseButton
          onClose={closeMenu}
          ref={closeButtonRef}
          isAnimatingRef={isAnimatingRef}
        />

        <div
          ref={contentRef}
          className="fixed inset-0 z-[60] flex items-center justify-center h-full w-full overflow-auto"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_auto]">
            {isMobile ? <MobileMenu /> : <DesktopMenu />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
