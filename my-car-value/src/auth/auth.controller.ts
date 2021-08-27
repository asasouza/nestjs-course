import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(AuthDTO)
  @Post()
  async signup(@Body() body: SignupDTO, @Session() session: any): Promise<User> {
    const user = await this.authService.signup(body);
    session.id = user.id;
    return user;
  }

  @Serialize(AuthDTO)
  @Post('authenticate')
  async authenticate(@Body() body: SignupDTO, @Session() session: any): Promise<User> {
    const user = await this.authService.authenticate(body);
    session.id = user.id;
    return user;
  }
}
