export interface MedicalRecord {
  patientID: string;
  date: string;
  codes: string[];
  chargePrice: number;
  diagnostics: string[];
  procedures: string[];
}

export interface MedicalRecordRow {
  id: string;
  dob: string;
  dos_from: string;
  code: string;
  patient_id: string;
  gender: string;
  allowed: string;
  dx1: string;
  dx2: string;
}
