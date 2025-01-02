import { useEffect, useState } from "react";
import { MedicalRecord, MedicalRecordRow } from "../types/MedicalRecord";
import { aggregatePatientMedicalHistory } from "../utils/medicalHistoryAggregation";
import { calculateAge, convertGender, Patient } from "../types/Patient";

export const useMedicalHistory = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<Patient>();

  // In the future, we can use this function to fetch data from an API
  const fetchCsvData = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch CSV file");
      const text = await res.text();
      const rows = text
        .trim()
        .split("\n")
        .slice(1)
        .map((rowLine: any) => {
          const [
            id,
            dob,
            gender,
            _billing_class,
            patient_id,
            _line,
            dos_from,
            _revcode,
            code,
            _units,
            _charges,
            _rend_provider_id,
            dx1,
            dx2,
            allowed,
            _benefit,
            _copay,
          ] = rowLine.split(",");
          const medicalRecordRow: MedicalRecordRow = {
            id,
            dob,
            dos_from,
            code,
            gender,
            patient_id,
            allowed,
            dx1,
            dx2,
          };
          return medicalRecordRow;
        });
      return rows;
    } catch (err) {
      throw new Error("Error processing CSV file");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const csvRows = await fetchCsvData("/dataforuitask.csv"); // Static file in public folder
        setPatientInfo({
          id: csvRows[0].patient_id,
          age: calculateAge(csvRows[0].dob),
          gender: convertGender(csvRows[0].gender),
        });

        const aggregatedRecords = aggregatePatientMedicalHistory(csvRows);
        setRecords(aggregatedRecords);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { patientInfo, medicalRecords: records, loading, error };
};
