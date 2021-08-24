import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    // constructor(private readonly usersRepository: Repository<User>) {}
    
    async createUser(data: CreateUserDTO): Promise<void> {
        console.log(data);
    }
}
