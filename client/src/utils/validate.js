import { splitLabel } from "./SplitLabel";

const maxLength = (name, value, max) => {
  return value.length > max ? `${splitLabel(name)} must be at most ${max} characters` : "";
};

const minLength = (name, value, min) => {
  return value.length < min ? `${splitLabel(name)} must be at least ${min} characters` : "";
};

const required = (name, value) => {
  return value.length === 0 ? `${splitLabel(name)} is required` : "";
};

const checkEmail = (name, value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(value).toLowerCase()) ? `${splitLabel(name)} must be a valid email` : "";
};

const checkMatchPassword = (name, value, sub) => {
  return value !== sub ? `${splitLabel(name)} does not match` : "";
};

const validPhoneNumber = (name, value) => {
  const re = /^0\d{9,11}$/;

  if (value.length === 0) return "";

  return !re.test(String(value))
    ? `${splitLabel(name)} must be a valid phone number starting with 0 and 10-12 digits`
    : "";
};

const validate = (name, value, sub = "") => {
  switch (name) {
    // Blog
    case "title":
      return required(name, value) || minLength(name, value, 10) || maxLength(name, value, 50);
    case "category":
      return required(name, value);
    case "description":
      return required(name, value) || minLength(name, value, 10) || maxLength(name, value, 200);
    case "thumbnail":
      return required(name, value);
    case "content":
      return required(name, value) || minLength(name, value, 10);

    // Room
    case "nameRoom":
      return required(name, value) || minLength(name, value, 5);
    case "avatarRoom":
      return required(name, value);

    // User
    case "account":
      return required(name, value) || checkEmail(name, value);
    case "username":
      return required(name, value) || minLength(name, value, 5);
    case "numberPhone":
      return validPhoneNumber(name, value);
    case "password":
      return required(name, value) || minLength(name, value, 4) || maxLength(name, value, 12);
    case "currentPassword":
      return required(name, value) || minLength(name, value, 4) || maxLength(name, value, 12);
    case "newPassword":
      return required(name, value) || minLength(name, value, 4) || maxLength(name, value, 12);
    case "confirmPassword":
      return (
        required(name, value) ||
        minLength(name, value, 4) ||
        maxLength(name, value, 12) ||
        checkMatchPassword(name, value, sub)
      );

    default:
      return "";
  }
};

export default validate;
