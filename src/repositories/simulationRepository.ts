import { AppDataSource } from "../data-source";
import { Simulation } from "../entity/Simulation";

export class SimulationRepository {
  private simulationRepo = AppDataSource.getRepository(Simulation);

  async save(simulation: Simulation): Promise<Simulation> {
    return this.simulationRepo.save(simulation);
  }

  async remove(simulation: Simulation): Promise<void> {
    await this.simulationRepo.remove(simulation);
  }
}