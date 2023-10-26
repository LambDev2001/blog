const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const maxLength = (name, value, max) => {
  return value.length > max
    ? `${capitalizeFirstLetter(name)} must be at most ${max} characters`
    : "";
};

const minLength = (name, value, min) => {
  return value.length < min
    ? `${capitalizeFirstLetter(name)} must be at least ${min} characters`
    : "";
};

const required = (name, value) => {
  return value.length === 0 ? `${capitalizeFirstLetter(name)} is required` : "";
};

const checkEmail = (name, value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(value).toLowerCase())
    ? `${capitalizeFirstLetter(name)} must be a valid email`
    : "";
};

const validate = (name, value) => {
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
    case "password":
      return required(name, value) || minLength(name, value, 4) || maxLength(name, value, 12);
    case "confirmPassword":
      return required(name, value) || minLength(name, value, 4) || maxLength(name, value, 12);

    default:
      return "";
  }
};

export default validate;
