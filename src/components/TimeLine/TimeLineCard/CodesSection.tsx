import { Grid, Link, Typography } from "@mui/material";
import React from "react";

const APPC_URL = "https://www.aapc.com/codes/cpt-codes";

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
      <div className="h-[100px] border-2 border-[rgba(51,65,85,0.5)] rounded-[0.5rem] overflow-y-auto p-2">
        <Grid container spacing={1}>
          {codes.map((code, idx) => (
            <Grid item key={idx}>
              <Link
                href={`${APPC_URL}/${code}`}
                target="_blank" // open the link in a new tab or window
                sx={{
                  display: "inline-block",
                  p: 1,
                  borderRadius: "0.5rem",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  textAlign: "center",
                  color: "rgba(179, 217, 255)",
                  backgroundColor: "rgba(0, 64, 128)",
                  border: "1px solid rgba(0, 51, 102)",
                  transition: "background-color 0.5s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 64, 128, 0.2)",
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
