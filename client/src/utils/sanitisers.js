export const strim = (value) => String(value).trim();

export const f = (string) => {
  const upperCaseCharAtZero = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  if (string.includes("-")) {
    let surnames = string.split("-");
    return surnames.map(upperCaseCharAtZero).join("-");
  }

  return upperCaseCharAtZero(string);
};
