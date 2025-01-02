import { Typography } from "@mui/material";
import React from "react";

interface DiagnosticsSectionProps {
  diagnostics: string[];
}

const DiagnosticsSection: React.FC<DiagnosticsSectionProps> = ({
  diagnostics,
}) => {
  return (
    <div className="mb-3">
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: "0.875rem",
          color: "#94a3b8",
          mb: 1,
        }}
      >
        Diagnostics:
      </Typography>
      <div className="flex gap-1 w-full overflow-x-auto">
        {diagnostics.map((diag, idx, arr) => (
          <React.Fragment key={idx}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#e2e8f0",
              }}
            >
              {diag}
            </Typography>
            {idx !== arr.length - 1 && (
              <Typography
                sx={{
                  color: "#64748b",
                }}
              >
                ,
              </Typography>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticsSection;
