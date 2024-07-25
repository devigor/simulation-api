import { Request, Response } from "express";
import { SimulationService } from "../services/simulationService";
import { Simulation } from "../entity/Simulation";
import { getPowerValue } from "../utils/power";
import { fetchPage, filterItemsByPower } from "../external/GeradoresApi";

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
    const { COEFICIENTE_DE_POTENCIA } = process.env;
    const { lightValue }: { lightValue: string } = req.body;

    const power = getPowerValue(lightValue, COEFICIENTE_DE_POTENCIA);

    if (!lightValue) {
      res.status(400).json({ error: 'Necessário informar o valor da conta!' });
      return;
    }


    const simulation = new Simulation(req.user.id, new Date());
    const itens = await fetchPage(1);
    const response = filterItemsByPower(itens, power);
    // await simulationService.save(simulation);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};