import { Request, Response, NextFunction } from 'express';

export const superuserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user!.role !== 'SUPERUSER') {
    return res.status(403).json({ message: 'Acesso Negado.' });
  }
  next();
};
