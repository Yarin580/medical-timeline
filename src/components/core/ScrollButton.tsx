import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";

interface ScrollButtonProps {
  direction: "left" | "right" | "up" | "down";
  onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
  const positionStyles =
    direction === "left"
      ? "left-4 top-1/2 transform -translate-y-1/2"
      : direction === "right"
      ? "right-4 top-1/2 transform -translate-y-1/2"
      : direction === "up"
      ? " left-1/2 -translate-x-1/2"
      : "bottom-4 left-1/2 transform -translate-x-1/2";

  const Icon =
    direction === "left"
      ? ArrowLeft
      : direction === "right"
      ? ArrowRight
      : direction === "up"
      ? ArrowUpward
      : ArrowDownward;

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionStyles} z-10 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default ScrollButton;
