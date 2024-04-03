export const validateEmail = (email) => {
  const errors = {};
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }
  return errors;
};
export const validatePassword = (password) => {
  const errors = {};
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  }
  return errors;
};
export const validatePincode = (pincode) => {
  const errors = {};
  if (!pincode) {
    errors.pincode = "Pincode is required";
  } else if (pincode.length !== 6) {
    errors.pincode = "Pincode must be 6 characters";
  }
  return errors;
};
