import React, { useEffect, useRef, useState } from "react";
import TimeLineCard from "../TimeLine/TimeLineCard/TimeLineCard";
import { MedicalRecord } from "../../types/MedicalRecord";
import TimelineLine from "../TimeLine/TimeLineLine";
import TimelineCardWrapper from "../TimeLine/TimeLineCardWrapper";
import ScrollButton from "../core/ScrollButton";
import { SwapHorizontalCircle, SwapVerticalCircle } from "@mui/icons-material";

interface TimeLineCardProps {
  medicalRecords: MedicalRecord[];
}

const TimeLineLayout: React.FC<TimeLineCardProps> = ({ medicalRecords }) => {
  // state to determine if the scroll direction is vertical
  const [isVertical, setIsVertical] = useState(false);

  // Creates a ref to store the IntersectionObserver instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Creates a ref to store the HTMLDivElement instance of the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the IntersectionObserver when the component mounts
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add the "animate-timeline-card" class when the element is in view
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-timeline-card");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    const cardElements = document.querySelectorAll(".timeline-card");
    cardElements.forEach((el) => observerRef.current?.observe(el));

    // Clean up the observer when the component is unmounted
    return () => observerRef.current?.disconnect();
  }, []);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const isPrev = direction === "prev";

    const axis = isVertical ? "scrollTop" : "scrollLeft";
    const offset = isPrev ? -scrollAmount : scrollAmount;

    const newScrollPosition = scrollContainerRef.current[axis] + offset;

    scrollContainerRef.current.scrollTo({
      [isVertical ? "up" : "left"]: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-full bg-slate-900">
      <button
        onClick={() => setIsVertical(!isVertical)}
        className="absolute top-4 right-4 z-20 bg-slate-800 hover:bg-slate-700 text-white rounded-lg p-2 shadow-lg transition-all duration-200 flex items-center gap-2"
        aria-label="Toggle layout"
      >
        {isVertical ? (
          <SwapHorizontalCircle className="w-5 h-5" />
        ) : (
          <SwapVerticalCircle className="w-5 h-5" />
        )}
        <span className="text-sm">
          {isVertical ? "Horizontal" : "Vertical"}
        </span>
      </button>
      <ScrollButton
        direction={isVertical ? "up" : "left"}
        onClick={() => scroll("prev")}
      />
      <ScrollButton
        direction={isVertical ? "down" : "right"}
        onClick={() => scroll("next")}
      />

      <div
        className="relative flex h-full items-center overflow-x-scroll scrool-smooth"
        ref={scrollContainerRef}
      >
        <div className="flex relative" style={{ minWidth: "max-content" }}>
          <TimelineLine />

          {medicalRecords.map((medicalRecord, index) => (
            <TimelineCardWrapper index={index} key={index}>
              <TimeLineCard
                medicalRecord={medicalRecord}
                className="max-h-[calc(50vh-7rem)] overflow-y-auto"
              />
            </TimelineCardWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLineLayout;
