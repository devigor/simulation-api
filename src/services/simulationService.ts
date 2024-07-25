import { Simulation } from "../entity/Simulation";
import { SimulationRepository } from "../repositories/simulationRepository";

export class SimulationService {
  private simulationRepository = new SimulationRepository();

  async save(simulation: Simulation): Promise<Simulation> {
    return this.simulationRepository.save(simulation);
  }

  async remove(simulation: Simulation): Promise<void> {
    await this.simulationRepository.remove(simulation);
  }

  async findSimulationsByUserId(userId: number): Promise<Simulation[]> {
    return this.simulationRepository.findSimulationsByUserId(userId);
  }

  async findSimulationsByCreationDate(userId: number, justCount?: boolean): Promise<Simulation[] | number> {
    return this.simulationRepository.findSimulationsByCreationDate(userId, justCount);
  }
}