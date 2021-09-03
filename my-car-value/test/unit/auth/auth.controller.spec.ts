import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../src/users/user.entity';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: Partial<AuthService>;

  beforeAll(async () => {
    authServiceMock = {
      authenticate: jest.fn(({ email, password }) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the current user', async () => {
    // Given  
    const userMock = { id: 123, email: 'user@email.com', password: 'qwer1234' };

    // When
    const user = await controller.whoAmI(userMock);

    // Then
    expect(user.email).toBe(userMock.email);
    expect(user.id).toBe(userMock.id);
  });

  it('should authenticate the user and update the session object', async () => {
    // Given
    const session = { userId: null };
    const data = { email: 'user@email.com', password: 'qwer1234' };

    // When
    const user = await controller.authenticate(data, session);

    // Then
    expect(user).toBeDefined();
    expect(session.userId).toBe(1);
  });
});
