import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/UserController';

export const userRouter = Router();

userRouter.get('/admin/users', getAllUsers);
userRouter.put('/admin/user/:id', updateUser);
userRouter.delete('/admin/user/:id', deleteUser);

