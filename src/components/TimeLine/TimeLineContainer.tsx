import { PropsWithChildren, useEffect, useRef } from "react";

type TimelineContainerProps = PropsWithChildren;
const TimelineContainer: React.FC<TimelineContainerProps> = ({ children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  return (
    <div className="w-full h-full bg-slate-900">
      <div className="relative flex h-full items-center overflow-x-auto">
        <div className="flex relative" style={{ minWidth: "max-content" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TimelineContainer;
