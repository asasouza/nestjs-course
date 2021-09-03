import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
@Serialize(UserDTO)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Get('/:id')
  async findOne(@Param('id') userId: string): Promise<User> {
    return this.usersService.findOne(parseInt(userId, 10));
  }

  @Get()
  async findAllWithEmail(@Query('email') email: string): Promise<User[]> {
    return this.usersService.findAllWithEmail(email);
  }

  @Delete('/:id')
  async remove(@Param('id') userId: string): Promise<void> {
    return this.usersService.remove(parseInt(userId, 10));
  }

  @Patch('/:id')
  async update(
    @Param('id') userId: string,
    @Body() body: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.update(parseInt(userId, 10), body);
  }
}
