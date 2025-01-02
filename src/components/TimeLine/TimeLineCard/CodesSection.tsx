import { Grid, Link, Typography } from "@mui/material";
import React from "react";

interface CodesSectionProps {
  codes: string[];
}

const CodesSection: React.FC<CodesSectionProps> = ({ codes }) => {
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
        Codes:
      </Typography>
      <div className="h-[100px] border-2 border-solid border-[rgba(51,65,85,0.5)] rounded-[0.5rem] overflow-y-auto p-2">
        <Grid container spacing={1}>
          {codes.map((code, idx) => (
            <Grid item key={idx}>
              <Link
                href={`https://www.aapc.com/codes/cpt-codes/${code}`}
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "inline-block",
                  p: 1,
                  borderRadius: "0.5rem",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  textAlign: "center",
                  color: "#c4b5fd",
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.3)",
                  },
                }}
              >
                {code}
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CodesSection;
