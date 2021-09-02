import { Test } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { AuthService } from '../../../src/auth/auth.service';
import { User } from '../../../src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    usersServiceMock = {
      findAllWithEmail: jest.fn((email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      }),
      createUser: jest.fn(
        ({ email, password }: { email: string; password: string }) => {
          const newUser = { id: Math.floor(Math.random() * 9999), email, password } as User;
          users.push(newUser);
          return Promise.resolve(newUser);
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

  it('creates a new user with a salted and hashed password', async () => {
    // Given
    const newUser = { email: 'user@email.com', password: 'qwer1234' };

    // When
    const createdUser = await service.signup(newUser);

    // Then
    expect(createdUser.password).not.toEqual('qwer1234');

    const [salt, hash] = createdUser.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email already in use', async () => {
    // Given
    const user = { id: 123, email: 'user@email.com', password: 'qwer1234' };
    await service.signup(user);
    
    // When
    const promise = service.signup(user);

    // Then
    expect(promise).rejects.toThrowError('email in use');
  });

  it('throws if signin is called with unused email', () => {
    // Given
    const user = { id: 123, email: 'user@email.com', password: 'qwer1234' };

    // When
    const promise = service.authenticate(user);

    // Then
    expect(promise).rejects.toThrowError('invalid email or password');
  });

  it('throws if an invalid password is provided', async () => {
    // Given
    const user = { id: 123, email: 'user@email.com', password: 'qwer1234' };
    await service.signup(user);
    
    const data = { email: 'user@email.com', password: '1234qwer' };

    // When
    const promise = service.authenticate(data);

    // Then
    expect(promise).rejects.toThrowError('invalid email or password');
  });

  it('returns a user if a correct password is provided', async () => {
    // Given
    const data = { email: 'user2@email.com', password: 'qwer1234' };
    await service.signup(data);

    // When
    const user = await service.authenticate(data);

    // Then
    expect(user).toBeDefined();
  });
});
