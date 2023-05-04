import request from 'supertest';
import { app } from '../../config/app';
import { createRating } from './utils';
import { signup } from '../setup';

let cookie: string[] = [];

beforeEach(async () => {
  const { cookie: newCookie } = await signup({ role: 'admin' });
  cookie = newCookie;
});

describe('auth check', () => {
  it('should return error if user is not logged in', async () => {
    cookie = [];
    const response = await request(app)
      .get('/api/ratings/some-id')
      .set('Cookie', cookie)
      .expect(401);

    expect(response.body.message).toBe(
      'You are not logged in! Please logged in to perform the action',
    );
  });

  it('should return error if user is not verified', async () => {
    const { cookie } = await signup({
      isVerified: false,
      email: 'test2@test.com',
    });

    const response = await request(app)
      .get('/api/ratings/some-id')
      .set('Cookie', cookie)
      .expect(401);

    expect(response.body.message).toEqual(
      'Please verified your email to complete this action!',
    );
  });

  it('should return error if user is not admin', async () => {
    const { cookie } = await signup({
      email: 'test2@test.com',
    });

    const response = await request(app)
      .get('/api/ratings/some-id')
      .set('Cookie', cookie)
      .expect(403);

    expect(response.body.message).toEqual(
      'You do not have permission to perform this action',
    );
  });
});

// ===================================================

it('returns 200 & successfully receives requested rating', async () => {
  const rating = await createRating();
  const response = await request(app)
    .get(`/api/ratings/${rating._id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.data._id).toEqual(rating._id);
});

it('should return error if objectid is not valid objectid', async () => {
  const response = await request(app)
    .get(`/api/ratings/12345678900`)
    .set('Cookie', cookie)
    .expect(400);

  expect(response.body.errors).toContain('Invalid ObjectId');
});

it('should return error if objectid is not existed', async () => {
  const response = await request(app)
    .get(`/api/ratings/507f1f77bcf86cd799439011`)
    .set('Cookie', cookie)
    .expect(404);

  expect(response.body.message).toEqual('Can not find rating with provided id');
});
