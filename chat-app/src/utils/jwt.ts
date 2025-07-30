import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

type TokenType = "access" | "refresh";

export function signJwt(payload: object, type: TokenType) {
  if (type === "access")
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

  if (type === "refresh")
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  return null;
}

export function verifyJwt(token: string, type: TokenType) {
  try {
    if (type === "access") return jwt.verify(token, ACCESS_SECRET);

    if (type === "refresh") return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
}
