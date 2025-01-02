import React, { useEffect, useRef } from "react";
import TimeLineCard from "../TimeLine/TimeLineCard/TimeLineCard";
import { MedicalRecord } from "../../types/MedicalRecord";
import TimelineLine from "../TimeLine/TimeLineLine";
import TimelineCardWrapper from "../TimeLine/TimeLineCardWrapper";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface TimeLineCardProps {
  medicalRecords: MedicalRecord[];
}

const TimeLineLayout: React.FC<TimeLineCardProps> = ({ medicalRecords }) => {
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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-full bg-slate-900">
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 z-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2  z-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2 "
      >
        <ArrowRight className="w-6 h-6" />
      </button>

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
