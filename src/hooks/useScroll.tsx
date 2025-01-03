import { useCallback, RefObject } from "react";

const useScroll = (
  isVertical: boolean,
  containerRef: RefObject<HTMLDivElement>
) => {
  const scroll = useCallback(
    (direction: "prev" | "next") => {
      if (!containerRef.current) return;

      const scrollAmount = 300;
      const scrollAxis = isVertical ? "scrollTop" : "scrollLeft";
      const isPrev = direction === "prev";

      const newScrollPosition =
        containerRef.current[scrollAxis] +
        (isPrev ? -scrollAmount : scrollAmount);

      const scrollDirection = isVertical
        ? { top: newScrollPosition }
        : { left: newScrollPosition };

      containerRef.current.scrollTo({
        ...scrollDirection,
        behavior: "smooth",
      });
    },
    [isVertical, containerRef]
  );

  return { scroll };
};

export default useScroll;
