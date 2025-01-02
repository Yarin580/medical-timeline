export interface Patient {
  id: string;
  age: number;
  gender: string;
}

export const calculateAge = (dob: string): number => {
  const [day, month, year] = dob.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the current date is before the person's birthday in the current year.
  // This ensures the calculated age is accurate even if the birthday hasn't occurred yet.
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const convertGender = (genderLetter: string): string => {
  switch (genderLetter) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    default:
      return "Unknown";
  }
};
