export const isValidEmail = (email) => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (isEmpty(email)) {
    return "Email address is required";
  }
  if (!regex.test(email)) {
    return "Email address must be valid. E.g you@example.com";
  }

  return false;
};

export const isValidPassword = (password, min = 8, max = 12) => {
  if (isEmpty(password)) {
    return "Password is required";
  }
  if (password.length < min || password.length > max) {
    return `Password length must be min ${min}, max ${max} chars`;
  }

  return false;
};

export const isValidMatch = (password, confirm) => {
  if (isEmpty(confirm)) {
    return "Confirm password is required";
  }
  if (!isEqual(password, confirm)) {
    return "Confirm password does not match password";
  }

  return false;
};

export const isEmpty = (value = "") => {
  if (value.trim() === "") return true;
  return false;
};

export const isEqual = (a, b) => {
  if (a === b) return true;
  return false;
};
