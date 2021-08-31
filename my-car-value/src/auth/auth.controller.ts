import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthDTO } from './dto/auth.dto';
import { SignupDTO } from './dto/signup.dto';

@Serialize(AuthDTO)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signup(@Body() body: SignupDTO, @Session() session: any): Promise<User> {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('authenticate')
  async authenticate(@Body() body: SignupDTO, @Session() session: any): Promise<User> {
    const user = await this.authService.authenticate(body);
    session.userId = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any): Promise<void> {
    return session.userId = null;
  }
}
