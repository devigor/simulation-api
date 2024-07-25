import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Simulation, StatusEnum } from "../entity/Simulation";

export class SimulationRepository {
  private simulationRepo = AppDataSource.getRepository(Simulation);

  async save(simulation: Simulation): Promise<Simulation> {
    return this.simulationRepo.save(simulation);
  }

  async remove(simulation: Simulation): Promise<void> {
    await this.simulationRepo.remove(simulation);
  }

  async findSimulationsByUserId(userId: number): Promise<Simulation[]> {
    return this.simulationRepo.find({ where: { userId } });
  };

  async findSimulationsByCreationDate(userId: number, justCount?: boolean): Promise<Simulation[] | number> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    let query = this.simulationRepo
      .createQueryBuilder("simulation")
      .where("simulation.userId = :userId", { userId })
      .andWhere("simulation.simulationDate BETWEEN :startOfDay AND :endOfDay", { startOfDay, endOfDay });

    if (justCount) {
      return query.getCount();
    }

    return query.getMany();
  }

  async findAllPendingSimulations(): Promise<Simulation[]> {
    return this.simulationRepo.find({ where: { status: Equal(StatusEnum.PENDING) } });
  }

  async updateSimulation(simulationId: number, simulation: Simulation): Promise<void> {
    await this.simulationRepo.update(simulationId, simulation);
  }
}