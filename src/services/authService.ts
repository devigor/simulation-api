import { User, UserRole } from '../entity/User';
import { UserRepository } from '../repositories/userRepository';
import { validatePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userRepository = new UserRepository();

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já cadastrado!');
    }

    const user = new User(name, email, password, UserRole.USER);
    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await validatePassword(password, user.password))) {
      throw new Error('Email ou senha incorretos');
    }

    const token = generateToken(user.id, user.role);
    return { token };
  }
}
