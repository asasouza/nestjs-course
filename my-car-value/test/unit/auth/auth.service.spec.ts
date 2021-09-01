import { Test } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { AuthService } from '../../../src/auth/auth.service';
import { User } from '../../../src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const usersServiceMock: Partial<UsersService> = {
      findAllWithEmail: jest.fn().mockResolvedValue([]),
      createUser: jest.fn(
        ({ email, password }: { email: string; password: string }) => {
          return Promise.resolve({ id: 1, email, password } as User);
        },
      ),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
});
