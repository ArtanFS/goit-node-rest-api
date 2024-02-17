import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../app.js';
import { usersService } from '../../services/index.js';

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'garate6805@laymro.com',
  subscription: 'srarter',
};

describe('test POST /api/users/login', () => {
  beforeAll(() => {
    jest
      .spyOn(usersService, 'login')
      .mockReturnValue({ user: userPayload, token: 'jwt.token.string' });
  });

  it('should return unauthorized error - 1', async () => {
    const testData = {
      email: 'garate6805@laymro.com',
      password: 'Pass1234',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(400);
  });

  it('should return unauthorized error - 2', async () => {
    const testData = {
      email: 'garate680@laymro.com',
      parol: 'Pass_1234',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(400);
  });

  it('should return a user object and a token', async () => {
    const correctUserData = {
      email: 'garate6805@laymro.com',
      password: 'Pass_1234',
    };

    const res = await request(app).post('/api/users/login').send(correctUserData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
    expect(res.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
