import { Request, Response } from 'express';
import { UserService } from '../services/userService';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>;
    }
  }
}

const userService = new UserService();

export const getMeUser = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user.id);
  res.status(200).json({
    id: user.id,
    name: user.name,
    role: user.role,
  });
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }));
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await userService.updateUser(parseInt(id, 10), name, email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id, 10));
    res.json({ message: 'Usuário deletado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
