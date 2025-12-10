import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const useMenuAnimation = (isOpen: boolean) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const addPanelRef = (el: HTMLDivElement | null) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  useEffect(() => {
    panelsRef.current = [];

    const content = contentRef.current;
    const closeButton = closeButtonRef.current;

    return () => {
      const panels = panelsRef.current;
      gsap.killTweensOf([panels, content, closeButton]);
    };
  }, []);

  useEffect(() => {
    gsap.killTweensOf([
      panelsRef.current,
      contentRef.current,
      closeButtonRef.current,
    ]);

    if (isOpen && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setIsAnimating(true);

      gsap.set(panelsRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap.set([contentRef.current, closeButtonRef.current], {
        opacity: 0,
        y: 50,
      });

      const openTimeline = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        },
      });

      openTimeline
        .to(panelsRef.current, {
          scaleX: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(
          [contentRef.current, closeButtonRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        );
    } else if (
      !isOpen &&
      !isAnimatingRef.current &&
      panelsRef.current.length > 0
    ) {
      isAnimatingRef.current = true;
      setIsAnimating(true);

      const closeTimeline = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        },
      });

      closeTimeline
        .to([contentRef.current, closeButtonRef.current], {
          opacity: 0,
          y: 50,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(
          panelsRef.current,
          {
            scaleX: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.in",
          },
          "-=0.1",
        );
    }
  }, [isOpen]);

  return {
    isAnimating,
    isAnimatingRef,
    panelsRef,
    contentRef,
    closeButtonRef,
    addPanelRef,
  };
};
