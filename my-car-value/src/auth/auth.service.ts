import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignupDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async signup(data: SignupDTO): Promise<User> {
        const { email, password } = data;
        const usersWithEmail = await this.userService.findAllWithEmail(email);

        if (usersWithEmail.length) {
            throw new BadRequestException('email in use');
        }

        // @ToDo criptografar a senha do usuario

        return this.userService.createUser({ email, password });


    }

    async authenticate() {}
}
