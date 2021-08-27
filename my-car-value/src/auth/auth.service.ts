import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignupDTO } from './dto/signup.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async signup(data: SignupDTO): Promise<User> {
        const { email, password } = data;
        const usersWithEmail = await this.userService.findAllWithEmail(email);

        if (usersWithEmail.length) {
            throw new BadRequestException('email in use');
        }
        
        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const saltedPassword = `${salt}.${hash.toString('hex')}`;

        return this.userService.createUser({ email, password: saltedPassword });
    }

    async authenticate(data: SignupDTO): Promise<User> {
        const { email, password } = data;

        const [user] = await this.userService.findAllWithEmail(email);

        if(!user) {
            throw new BadRequestException('invalid email or password');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('invalid email or password');
        }
        return user;
    }
}
