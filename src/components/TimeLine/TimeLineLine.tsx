import React from "react";
import { useTimelineDirection } from "../../context/TimeLineDirectionContext";

const TimelineLine: React.FC = () => {
  const { isVertical } = useTimelineDirection();
  return (
    <div
      className={`absolute ${
        isVertical
          ? "left-1/2 h-full w-[5px] -translate-x-1/2 bg-gradient-to-b"
          : "top-1/2 w-full h-[5px] -translate-y-1/2 bg-gradient-to-r"
      } from-violet-500 to-fuchsia-500`}
    />
  );
};

export default TimelineLine;
