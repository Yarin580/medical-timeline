import { createContext, useContext, useState } from "react";

interface TimelineDirectionContextType {
  isVertical: boolean;
  toggleOrientation: () => void;
}

const TimelineDirectionContext = createContext<
  TimelineDirectionContextType | undefined
>(undefined);

export const TimelineDirectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVertical, setIsVertical] = useState(false);
  const toggleOrientation = () => setIsVertical((prev) => !prev);

  return (
    <TimelineDirectionContext.Provider
      value={{ isVertical, toggleOrientation }}
    >
      {children}
    </TimelineDirectionContext.Provider>
  );
};

export const useTimelineDirection = () => {
  const context = useContext(TimelineDirectionContext);
  if (!context)
    throw new Error(
      "useTimelineDirection must be used within TimelineProvider"
    );
  return context;
};
