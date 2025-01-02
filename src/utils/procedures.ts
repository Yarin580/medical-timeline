export const PROCEDURES = {
  "99": "E/M",
  "11": "Surgery",
  "71": "Rediology",
  "73": "Rediology",
  "80": "Laboratory",
  "83": "Laboratory",
  // "90": "Medicine",
  "93": "Medicine",
  A4: "Misecllaneous",
  J1: "Misecllaneous",
  "00": "Anesthesia",
  "97": "Physical Medicine and Rehabilitation",
  "90": "Immunizations",
  "92": "Ophthalmology",
};

export const getProducerByCode = (code: string) => {
  const codePrefix = code.substring(0, 2) as keyof typeof PROCEDURES;
  return PROCEDURES[codePrefix];
};
