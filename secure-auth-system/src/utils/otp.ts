export const generateOTP = (length: number = 4): string => {
  const characters =
    "0987654321qwertyuiopasdfghjklzxcvbnm";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }
  return otp;
};

export const generateOTPExpiry = (minutes: number = 5): Date => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
  return expiresAt;
};
