import React from "react";
import { useMedicalHistory } from "../hooks/useMedicalHistory";
import TimeLineLayout from "../components/layout/TimeLineLayout";
import { CircularProgress } from "@mui/material";
import { useTimelineDirection } from "../context/TimeLineDirectionContext";
import { SwapHorizontalCircle, SwapVerticalCircle } from "@mui/icons-material";

const PatientMedicalHistoryPage: React.FC = () => {
  const { patientInfo, medicalRecords, loading } = useMedicalHistory();
  const { isVertical, toggleOrientation } = useTimelineDirection();

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800  backdrop-blur-sm border-b flex items-center justify-between border-slate-700 p-6">
        <h1 className="text-2xl font-semibold text-slate-100">
          Patient Medical History
        </h1>
        <button
          onClick={toggleOrientation}
          className="  bg-slate-800 hover:bg-slate-700 text-white rounded-lg p-2 items-center justify-end gap-2"
        >
          {isVertical ? (
            <SwapHorizontalCircle className="w-5 h-5" />
          ) : (
            <SwapVerticalCircle className="w-5 h-5" />
          )}
          <span className="text-sm">
            {isVertical ? "Horizontal" : "Vertical"}
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <CircularProgress color="primary" size={48} />
        </div>
      ) : (
        <>
          {/* Patient Info */}
          <div className="bg-slate-900 p-4 shadow-md">
            <div className="mt-2 flex gap-5 text-white">
              <span>
                <strong>Patient:</strong> {patientInfo?.id} (
                {patientInfo?.gender}, {patientInfo?.age} Years Old)
              </span>
            </div>
          </div>

          {/* Medical Records Timeline */}
          <div className="flex-1 overflow-y-auto">
            <TimeLineLayout medicalRecords={medicalRecords} />
          </div>
        </>
      )}
    </div>
  );
};

export default PatientMedicalHistoryPage;
