import { useEffect, useRef } from "react";

const useTimelineAnimation = (isVertical: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect the previous observer
    observerRef.current?.disconnect();

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-timeline-card");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all card elements and observe them
    const cardElements = document.querySelectorAll(".timeline-card");
    cardElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [isVertical]);
};

export default useTimelineAnimation;
