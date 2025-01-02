import { MedicalRecord, MedicalRecordRow } from "../types/MedicalRecord";
import { getProducerByCode } from "./procedures";

export const aggregatePatientMedicalHistory = (
  data: MedicalRecordRow[]
): MedicalRecord[] => {
  const medicalRecords: { [key: string]: MedicalRecord } = {};

  data.forEach((row) => {
    const key = `${row.patient_id}-${row.dos_from}`;
    if (!medicalRecords[key]) {
      medicalRecords[key] = {
        patientID: row.patient_id,
        date: row.dos_from,
        codes: [],
        chargePrice: 0,
        diagnostics: [],
        procedures: [],
      };
    }

    // Add code if it's not already present
    addUniqueValue(medicalRecords[key].codes, row.code);

    // Get the producer by code
    const producer = getProducerByCode(row.code);

    // Add producer if not already present
    if (producer) {
      addUniqueValue(medicalRecords[key].procedures, producer);
    }

    // Add charge to the total chargePrice
    medicalRecords[key].chargePrice += parseFloat(row.allowed);

    // Add diagnostics (dx1 and dx2) if not already present
    addUniqueValue(medicalRecords[key].diagnostics, row.dx1);
    addUniqueValue(medicalRecords[key].diagnostics, row.dx2);
  });

  // Sort by date using the custom date parsing function
  return Object.values(medicalRecords).sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const addUniqueValue = <T>(array: T[], value: T) => {
  if (value && !array.includes(value)) {
    array.push(value);
  }
};
