import { Request, Response } from "express";
import { SimulationService } from "../services/simulationService";
import { Simulation } from "../entity/Simulation";
import { getPowerValue } from "../utils/power";
import { fetchPage, filterItemsByPower } from "../external/GeradoresApi";
import { PdfCreateProps, createPdfSimulation } from "../utils/pdf";

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

    // await simulationService.save(simulation);
    res.status(201).json();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};