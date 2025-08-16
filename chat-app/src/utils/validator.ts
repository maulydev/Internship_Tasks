export const validatePassword = (password: string) => {
  let error = "";

  if (!password) {
    error = "Password is required";
  } else if (password.length < 8) {
    error = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    error = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    error = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    error = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    error = "Password must contain at least one special character";
  } else if (/\s/.test(password)) {
    error = "Password must not contain spaces";
  }

  return { error };
};

export const validateEmail = (email: string) => {
  let error = "";

  if (!email) {
    error = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error = "Invalid email address";
    }
  }

  return { error };
};