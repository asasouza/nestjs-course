import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() body: SignupDTO): Promise<User> {
    return this.authService.signup(body);
  }
}
