import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await userService.updateUser(parseInt(id, 10), name, email, password);
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id, 10));
    return res.json({ message: 'Usuário deletado' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
