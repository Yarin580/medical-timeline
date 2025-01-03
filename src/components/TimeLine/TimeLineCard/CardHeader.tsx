import { Chip, Typography } from "@mui/material";
import React from "react";

interface CardHeaderProps {
  date: string;
  chargePrice: number;
}

const CardHeader: React.FC<CardHeaderProps> = ({ date, chargePrice }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "#e2e8f0",
        }}
      >
        {date}
      </Typography>

      <Chip
        label={`$${chargePrice}`}
        sx={{
          px: 2,
          py: 0.5,
          fontSize: "1rem",
          borderRadius: "9999px",
          fontWeight: 600,
          backgroundColor:
            chargePrice > 5000
              ? "rgba(244, 63, 94, 0.2)"
              : "rgba(16, 185, 129, 0.2)",
          color: chargePrice > 5000 ? "#fca5a5" : "#6ee7b7",
          border: `1px solid ${
            chargePrice > 5000
              ? "rgba(244, 63, 94, 0.3)"
              : "rgba(16, 185, 129, 0.3)"
          }`,
        }}
      />
    </div>
  );
};

export default CardHeader;
