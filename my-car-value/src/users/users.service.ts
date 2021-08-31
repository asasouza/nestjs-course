import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const { email, password } = data;
    const newUser = this.usersRepository.create({ email, password });
    // Chamar o metodo .save diretamente tambem funcionaria
    // porem caso a entidade User aplicasse algum hook do TypeORM
    // (AfterInsert, AfterUpdate, AfterRemove, etc) ele nao seria executado.
    // Ao criar passar uma entidade para o .save, neste caso criada pelo metodo
    // .create, os hooks seriam executadoss
    return this.usersRepository.save(newUser);
  }

  async findOne(userId: number): Promise<User> {
    if (!userId) {
      return null;
    }
    const user = this.usersRepository.findOne(userId);
    if(!user) {
        // Lancar excecoes deste tipo dentro do Service pode nao ser
        // apropriado, como esse tipo de excecao esta ligado diretamente
        // ao protocolo HTTP caso a aplicacao tambem utiliza-se outro protocolo,
        // como WebSocket, este erro nao seria correto e exigira refatoracao. 
        // Uma solucao para garantir a reusabilidade do service é criar um 
        // ExceptionFilter para ser utilizado em todos os services, onde as 
        // camadas superiores da aplicacao lancassem o erro adequado.
        throw new NotFoundException('user not found');
    }
    return user;
  }

  async findAllWithEmail(email: string): Promise<User[]> {
    return this.usersRepository.find({ email });
  }

  async update(userId: number, attrs: Partial<User>): Promise<User> {
    const userToUpdate = await this.findOne(userId);

    if (!userToUpdate) {
      throw new NotFoundException('user not found');
    }
    Object.assign(userToUpdate, attrs);
    return this.usersRepository.save(userToUpdate);
  }

  async remove(userId: number): Promise<void> {
    const userToRemove = await this.findOne(userId);
    if (userToRemove) {
        await this.usersRepository.remove(userToRemove);
    }
  }
}
