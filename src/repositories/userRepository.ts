import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async remove(user: User): Promise<void> {
    await this.userRepo.remove(user);
  }
}
