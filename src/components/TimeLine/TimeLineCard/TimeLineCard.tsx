import React from "react";
import { Card } from "@mui/material";
import { MedicalRecord } from "../../../types/MedicalRecord";
import CardHeader from "./CardHeader";
import CodesSection from "./CodesSection";
import DiagnosticsSection from "./DiagnosticsSection";
import TagsSection from "./TagsSection";

interface TimeLineCardProps {
  medicalRecord: MedicalRecord;
  className?: string;
}

const TimeLineCard: React.FC<TimeLineCardProps> = ({
  medicalRecord,
  className,
}) => {
  return (
    <Card
      className={className}
      sx={{
        bgcolor: "#1e293b",
        borderRadius: 2,
        boxShadow: 8,
        p: 3,
        height: "50vh",
        border: "1px solid #334155",
        overflowY: "auto",
      }}
    >
      <CardHeader
        date={medicalRecord.date}
        chargePrice={medicalRecord.chargePrice}
      />
      <CodesSection codes={medicalRecord.codes} />
      <DiagnosticsSection diagnostics={medicalRecord.diagnostics} />
      <TagsSection tags={medicalRecord.procedures} />
    </Card>
  );
};

export default TimeLineCard;
