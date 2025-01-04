import React, { useRef } from "react";
import TimeLineCard from "../TimeLine/TimeLineCard/TimeLineCard";
import { MedicalRecord } from "../../types/MedicalRecord";
import TimelineLine from "../TimeLine/TimeLineLine";
import TimelineCardWrapper from "../TimeLine/TimeLineCardWrapper";
import ScrollButton from "../core/ScrollButton";
import { useTimelineDirection } from "../../context/TimelineDirectionContext";
import useScroll from "../../hooks/useScroll";
import useTimelineAnimation from "../../hooks/useTimelineAnimation";

interface TimeLineCardProps {
  medicalRecords: MedicalRecord[];
}

const TimeLineLayout: React.FC<TimeLineCardProps> = ({ medicalRecords }) => {
  const { isVertical } = useTimelineDirection();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scroll } = useScroll(isVertical, scrollContainerRef);
  useTimelineAnimation(isVertical);

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
          style={{ minWidth: isVertical ? "auto" : "" }}
        >
          <TimelineLine />
          {medicalRecords.map((medicalRecord, index) => (
            <TimelineCardWrapper index={index} key={index}>
              <TimeLineCard
                medicalRecord={medicalRecord}
                className={`${
                  isVertical ? "" : "max-h-[calc(50vh-7rem)]"
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
