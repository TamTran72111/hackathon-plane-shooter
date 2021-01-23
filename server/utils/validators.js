const validateStringField = (field, minLength = 6, fieldName) => {
  if (field === undefined || field === '') {
    return `${fieldName} is required`;
  } else if (typeof field !== 'string') {
    return `Invalid ${fieldName}`;
  } else if (field.length < minLength) {
    return `The length of ${fieldName} must be at least ${minLength} characters`;
  }
  return undefined;
};

const MIN_USERNAME_LENGTH = 6;
const validateUsername = (username) => {
  const error = validateStringField(username, MIN_USERNAME_LENGTH, 'Username');
  if (error) {
    return error;
  }
  if (username.match(/[a-z][a-z0-9]*/i)) {
    return undefined;
  }
  return 'Username must be start with a letter and contains letters and numbers only';
};

const MIN_PASSWORD_LENGTH = 8;
const validatePassword = (password) => {
  return validateStringField(password, MIN_PASSWORD_LENGTH, 'Password');
};

module.exports = {
  validateUsername,
  validatePassword,
};
