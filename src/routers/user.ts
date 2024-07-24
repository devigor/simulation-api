import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser, getMeUser } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { superuserMiddleware } from '../middlewares/superUserMiddleware';

export const userRouter = Router();

userRouter.get('/me', [authMiddleware], getMeUser);
userRouter.get('/', [authMiddleware, superuserMiddleware], getAllUsers);
userRouter.put('/:id', [authMiddleware, superuserMiddleware], updateUser);
userRouter.delete('/:id', [authMiddleware, superuserMiddleware], deleteUser);

