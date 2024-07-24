import { UserRepository } from '../repositories/userRepository';
import { hashPassword } from '../utils/hash';
import { User } from '../entity/User';

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async updateUser(id: number, name: string, email: string, password: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ? await hashPassword(password) : user.password;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);
  }
}
