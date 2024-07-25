import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { saveSimulation } from '../controllers/SimulationController';

export const simulationRouter = Router();

simulationRouter.post('/create', [authMiddleware], saveSimulation);