import { config } from "dotenv";
config();
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT;

export const generateToken = (userId: number, role: string): string => {
  return sign({ id: userId, role }, JWT_SECRET);
};

export const verifyToken = (token: string): any => {
  return verify(token, JWT_SECRET);
};