import { UserRepository } from '@/storage/repository/user.repository.ts';
import TokenService from '@/services/token.service.ts';
import { comparePassword } from "@/utils/password.ts";

export class AuthService {

  constructor(private userRepo: UserRepository, private tokenService: TokenService) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.getUserByEmail(email);

    const result = comparePassword(password, user.password_hash);

    const token = this.tokenService.createToken(user.username);
    
    return token;
  }
}
