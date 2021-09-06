import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as supertest from 'supertest';

describe('Auth Domain E2E', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/auth (POST)', async () => {
    // Given
    const data = { email: 'user5@email.com', password: 'qwer1234' };

    // When
    const { status, body, header } = await request.post('/auth').send(data);
    
    // Then
    const { id, email } = body;

    expect(status).toBe(201);
    expect(id).toBeDefined();
    expect(email).toBe(data.email);
  });

  it('/auth/whoami (POST)', async () => {
    // Given
    const data = { email: 'user5@email.com', password: 'qwer1234' };

    const res = await request.post('/auth').send(data).expect(201);
  
    const cookie = res.get('Set-Cookie');

    // When
    const { body } = await request.get('/auth/whoami').set('Cookie', cookie).expect(200);

    // Then
    expect(body.email).toBe(data.email);


  })
});
