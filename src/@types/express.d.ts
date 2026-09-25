// src/@types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
      };
    }
  }
}