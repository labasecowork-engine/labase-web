import { useState, useLayoutEffect } from "react";

export const useScroll = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleScroll = () => {
    setPosition({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollTo = (x: number, y: number) => {
    if (typeof window !== "undefined") {
      window.scrollTo(x, y);
    }
  };

  return { position, scrollTo };
};
