import React, { PropsWithChildren } from "react";
import LineDot from "./LineDot";
import { useTimelineDirection } from "../../context/TimeLineDirectionContext";

type TimelineCardWrapperProps = PropsWithChildren & {
  index: number;
};

const TimelineCardWrapper: React.FC<TimelineCardWrapperProps> = ({
  children,
  index,
}) => {
  const { isVertical } = useTimelineDirection();
  return (
    <div
      className={`${
        isVertical ? "h-[500px] w-full" : "flex-none w-[500px]"
      } flex justify-center`}
    >
      <LineDot />
      <div
        className={`relative w-[400px] timeline-card opacity-0 ${
          isVertical
            ? index % 2 === 0
              ? "left-[calc(50%+1rem)]"
              : "right-[calc(50%+1rem)]"
            : index % 2 === 0
            ? "top-[calc(50%+1rem)]"
            : "bottom-[calc(50%+1rem)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TimelineCardWrapper;
