import bcrypt from "bcryptjs";

export const hashPass = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const checkPass = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};