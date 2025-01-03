import React, { useEffect, useRef } from "react";
import TimeLineCard from "../TimeLine/TimeLineCard/TimeLineCard";
import { MedicalRecord } from "../../types/MedicalRecord";
import TimelineLine from "../TimeLine/TimeLineLine";
import TimelineCardWrapper from "../TimeLine/TimeLineCardWrapper";
import ScrollButton from "../core/ScrollButton";
import { useTimelineDirection } from "../../context/TimeLineDirectionContext";

interface TimeLineCardProps {
  medicalRecords: MedicalRecord[];
}

const TimeLineLayout: React.FC<TimeLineCardProps> = ({ medicalRecords }) => {
  const { isVertical } = useTimelineDirection();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const cardElements = document.querySelectorAll(".timeline-card");
    cardElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const isPrev = direction === "prev";
    const scrollAxis = isVertical ? "scrollTop" : "scrollLeft";
    const newScrollPosition =
      scrollContainerRef.current[scrollAxis] +
      (isPrev ? -scrollAmount : scrollAmount);

    const scrollDirection = isVertical
      ? { top: newScrollPosition }
      : { left: newScrollPosition };

    scrollContainerRef.current.scrollTo({
      ...scrollDirection,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-full bg-slate-900">
      <ScrollButton
        direction={isVertical ? "up" : "left"}
        onClick={() => scroll("prev")}
      />
      <ScrollButton
        direction={isVertical ? "down" : "right"}
        onClick={() => scroll("next")}
      />

      <div
        ref={scrollContainerRef}
        className={`relative flex h-full items-center scroll-smooth
          ${
            isVertical
              ? "flex-col overflow-y-scroll pt-16 pb-16"
              : "overflow-x-scroll"
          }`}
      >
        <div
          className={`relative ${isVertical ? "flex flex-col" : "flex"}`}
          style={{ minWidth: isVertical ? "auto" : "max-content" }}
        >
          <TimelineLine />
          {medicalRecords.map((medicalRecord, index) => (
            <TimelineCardWrapper index={index} key={index}>
              <TimeLineCard
                medicalRecord={medicalRecord}
                className={`${
                  isVertical
                    ? "max-w-[calc(100vw-2rem)]"
                    : "max-h-[calc(50vh-7rem)]"
                } overflow-y-auto`}
              />
            </TimelineCardWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLineLayout;
