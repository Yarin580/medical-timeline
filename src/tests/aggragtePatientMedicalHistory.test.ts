import { aggregatePatientMedicalHistory } from "../utils/medicalHistoryAggregation";
import { getProducerByCode } from "../utils/procedures";
import { MedicalRecordRow, MedicalRecord } from "../types/MedicalRecord";

// Mock the `getProducerByCode` function
jest.mock("../utils/procedures", () => ({
  getProducerByCode: jest.fn(),
}));

describe("aggregatePatientMedicalHistory", () => {
  const mockData: MedicalRecordRow[] = [
    {
      id: "1",
      dob: "01/01/1990",
      dos_from: "01/01/2021",
      code: "A01",
      allowed: "200",
      dx1: "Dx1",
      dx2: "Dx2",
      gender: "M",
      patient_id: "123",
    },
    {
      id: "1",
      dob: "01/01/1990",
      dos_from: "01/01/2021",
      code: "B01",
      allowed: "200",
      dx1: "Dx1",
      dx2: "Dx2",
      gender: "M",
      patient_id: "123",
    },
    {
      id: "1",
      dob: "01/01/1990",
      dos_from: "01/01/2021",
      code: "A01",
      allowed: "200",
      dx1: "Dx3",
      dx2: "Dx4",
      gender: "M",
      patient_id: "123",
    },
    {
      id: "1",
      dob: "01/01/1990",
      dos_from: "01/02/2021",
      code: "C01",
      allowed: "200",
      dx1: "Dx1",
      dx2: "Dx2",
      gender: "M",
      patient_id: "123",
    },
  ];

  // Setup mock implementation of getProducerByCode
  beforeEach(() => {
    (getProducerByCode as jest.Mock).mockImplementation((code) => {
      switch (code) {
        case "A01":
          return "Producer1";
        case "B01":
          return "Producer2";
        case "C01":
          return "Producer3";
        default:
          return null;
      }
    });
  });

  it("should aggregate medical history correctly", () => {
    const result = aggregatePatientMedicalHistory(mockData);

    expect(result.length).toBe(2);

    // Check the first patient's record
    const firstRecord = result[0] as MedicalRecord;
    expect(firstRecord.patientID).toBe("123");
    expect(firstRecord.date).toBe("01/01/2021");
    expect(firstRecord.codes).toEqual(["A01", "B01"]);
    expect(firstRecord.chargePrice).toBe(600);
    expect(firstRecord.diagnostics).toEqual(["Dx1", "Dx2", "Dx3", "Dx4"]);
    expect(firstRecord.procedures).toEqual(["Producer1", "Producer2"]);

    // Check the second patient's record
    const secondRecord = result[1] as MedicalRecord;
    expect(secondRecord.patientID).toBe("123");
    expect(secondRecord.date).toBe("01/02/2021");
    expect(secondRecord.codes).toEqual(["C01"]);
    expect(secondRecord.chargePrice).toBe(200.0);
    expect(secondRecord.diagnostics).toEqual(["Dx1", "Dx2"]);
    expect(secondRecord.procedures).toEqual(["Producer3"]);
  });

  it("should sort the records by date", () => {
    const result = aggregatePatientMedicalHistory(mockData);

    // The records should be sorted by date in ascending order
    expect(result[0].date).toBe("01/01/2021");
    expect(result[1].date).toBe("01/02/2021");
  });

  it("should handle empty data array", () => {
    const result = aggregatePatientMedicalHistory([]);

    expect(result.length).toBe(0);
  });

  it("should handle missing producer for a code", () => {
    (getProducerByCode as jest.Mock).mockImplementationOnce(() => null);
    const result = aggregatePatientMedicalHistory([
      {
        id: "1",
        dob: "01/01/1990",
        gender: "M",
        patient_id: "1",
        dos_from: "01/01/2021",
        code: "UnknownCode",
        allowed: "100.0",
        dx1: "Dx1",
        dx2: "Dx2",
      },
    ]);

    const record = result[0];
    expect(record.procedures).toEqual([]); // Producer should not be added
  });

  it("should not add duplicate codes or diagnostics", () => {
    const result = aggregatePatientMedicalHistory([
      {
        id: "1",
        dob: "01/01/1990",
        gender: "M",
        patient_id: "1",
        dos_from: "01/01/2021",
        code: "A01",
        allowed: "100.0",
        dx1: "Dx1",
        dx2: "Dx1", // duplicate diagnostic
      },
      {
        id: "1",
        dob: "01/01/1990",
        gender: "M",
        patient_id: "1",
        dos_from: "01/01/2021",
        code: "A01",
        allowed: "50.0",
        dx1: "Dx1", // duplicate diagnostic
        dx2: "Dx2",
      },
    ]);

    expect(result[0].diagnostics).toEqual(["Dx1", "Dx2"]);
  });
});
