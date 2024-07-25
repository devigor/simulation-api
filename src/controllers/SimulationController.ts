import { Request, Response } from "express";
import { SimulationService } from "../services/simulationService";
import { Simulation } from "../entity/Simulation";

const simulationService = new SimulationService();

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

export const saveSimulation = async (req: Request, res: Response) => {
  try {
    const { lightValue }: { lightValue: string } = req.body;

    if (!lightValue) {
      res.status(400).json({ error: 'Necessário informar o valor da conta!' });
      return;
    }

    const numberOfSimulations = await simulationService.findSimulationsByCreationDate(req.user.id, true) as number;

    if (numberOfSimulations > 4) {
      return res.status(400).json({ message: "Número máximo de simulações atingido!" })
    }

    const newSimulation = new Simulation(req.user.id, new Date(), lightValue);

    await simulationService.save(newSimulation);
    res.status(201).json({ message: "Simulação feita com sucesso, em breve enviaremos um email com nossa proposta!" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};