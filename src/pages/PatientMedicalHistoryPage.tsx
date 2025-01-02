import React from "react";
import { useMedicalHistory } from "../hooks/useMedicalHistory";
import TimeLineLayout from "../components/layout/TimeLineLayout";
import { CircularProgress } from "@mui/material";

const PatientMedicalHistoryPage: React.FC = () => {
  const { patientInfo, medicalRecords, loading } = useMedicalHistory();

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 backdrop-blur-sm border-b border-slate-700 p-6">
        <h1 className="text-2xl font-semibold text-slate-100">
          Patient Medical History
        </h1>
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
