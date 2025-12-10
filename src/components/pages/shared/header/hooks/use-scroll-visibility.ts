import { useState, useEffect } from "react";
import { useScroll } from "../../../../../hooks";

export const useScrollVisibility = () => {
  const [previousScrollY, setPreviousScrollY] = useState<number>(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isStartPage, setIsStartPage] = useState<boolean>(false);

  const {
    position: { y: currentScrollY },
  } = useScroll();

  useEffect(() => {
    const scrolledDown = currentScrollY > previousScrollY;
    const scrolledUp = currentScrollY < previousScrollY;

    if (scrolledDown && currentScrollY > 100) {
      setIsHeaderVisible(false);
    }

    if (scrolledUp) {
      setIsHeaderVisible(true);
    }

    if (currentScrollY <= 100) {
      setIsHeaderVisible(true);
      setIsStartPage(true);
    } else {
      setIsStartPage(false);
    }

    setPreviousScrollY(currentScrollY);
  }, [currentScrollY, previousScrollY]);

  return { isHeaderVisible, isStartPage };
};
