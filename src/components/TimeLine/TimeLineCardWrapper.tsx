import React, { PropsWithChildren } from "react";
import LineDot from "./LineDot";

type TimelineCardWrapperProps = PropsWithChildren & {
  index: number;
};

const TimelineCardWrapper: React.FC<TimelineCardWrapperProps> = ({
  children,
  index,
}) => {
  return (
    <div className="flex-none w-[500px] flex justify-center m-5 relative">
      <LineDot />

      <div
        className={`absolute w-[400px] timeline-card opacity-0 ${
          index % 2 === 0 ? "top-[calc(50%+1rem)]" : "bottom-[calc(50%+1rem)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TimelineCardWrapper;
