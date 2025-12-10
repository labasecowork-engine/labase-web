import React from "react";

interface MenuPanelsProps {
  addPanelRef: (el: HTMLDivElement | null) => void;
}

export const MenuPanels: React.FC<MenuPanelsProps> = ({ addPanelRef }) => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          ref={addPanelRef}
          className="fixed inset-y-0 bg-stone-900"
          style={{
            left: `${index * 25}%`,
            width: "26%",
            zIndex: 45 + index,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};
