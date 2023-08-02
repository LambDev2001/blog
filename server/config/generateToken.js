import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";

const {TEMP_TOKEN, ACTIVE_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

export const generateToken= (payload) => {
  return jwt.sign(payload, `${TEMP_TOKEN}`, {expiresIn: "5m"})
}

export const generateActiveToken = (payload) => {
  return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, { expiresIn: "2m" });
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: "120m" });
};

export const generateRefreshToken = (payload, res) => {
  const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days,
    domain: `localhost`
  });
  return refresh_token;
};
