import request from 'supertest';
import { app } from '../../config/app';
import { createVariant, validVariantData } from './utils';
import { signup } from '../setup';
let cookie: string[] = [];

beforeEach(async () => {
  const { cookie: newCookie } = await signup({ role: 'admin' });
  cookie = newCookie;
});

it('returns 200 & successfully update the variants', async () => {
  let variant1 = await createVariant();
  let variant2 = await createVariant();

  const response = await request(app)
    .put('/api/variants')
    .set('Cookie', cookie)
    .send({
      updateList: [variant1._id, variant2._id],
      ...validVariantData,
    })
    .expect(200);

  expect(response.body.data.modifiedCount).toEqual(2);

  // double check
  const updatedVariant1 = await request(app)
    .get(`/api/variants/${variant1._id}`)
    .set('Cookie', cookie)
    .expect(200);
  const updatedVariant2 = await request(app)
    .get(`/api/variants/${variant2._id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(updatedVariant1.body.data).toMatchObject(validVariantData);
  expect(updatedVariant2.body.data).toMatchObject(validVariantData);
});

describe('auth check', () => {
  it('should return error if user is not logged in', async () => {
    cookie = [];
    const response = await request(app)
      .put('/api/variants')
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
      .put('/api/variants')
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
      .put('/api/variants')
      .set('Cookie', cookie)
      .expect(403);

    expect(response.body.message).toEqual(
      'You do not have permission to perform this action',
    );
  });
});

// =====================================================

it('should return error if updateList contains invalid objectid', async () => {
  const response = await request(app)
    .put('/api/variants')
    .send({
      updateList: ['id-not-valid', 'invalid-id'],
      test_number: 24,
    })
    .set('Cookie', cookie)
    .expect(400);

  expect(response.body.message).toEqual('Data validation failed');
  expect(response.body.errors).toContain('Invalid ObjectId');
});

it('should return error if updateList contains non-existent objectid', async () => {
  const response = await request(app)
    .put('/api/variants')
    .send({
      updateList: ['507f191e810c19729de860ea', '00000020f51bb4362eee2a4d'],
      test_number: 24,
    })
    .set('Cookie', cookie)
    .expect(404);

  expect(response.body.message).toEqual(
    'Can not find variant with provided ids',
  );
});
