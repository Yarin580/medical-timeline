import React from "react";
import { useTimelineDirection } from "../../context/TimeLineDirectionContext";

const LineDot: React.FC = () => {
  const { isVertical } = useTimelineDirection();
  return (
    <div
      className={`absolute ${
        isVertical ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2"
      } h-4 w-4 bg-violet-500 rounded-full border-4 border-slate-900 shadow-lg`}
    />
  );
};

export default LineDot;
