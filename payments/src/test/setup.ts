import request from 'supertest';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper.ts');
process.env.STRIPE_KEY =
  'sk_test_51GsteSK6lfEXMYmEZ3dgNuGD1bXsrefuKHuzxkNgynN64h1Y7jLdneKPoxjj823jVcmvM7SCbtMsZONL0aNVURZz00ccF5OC1N';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'zuly1960';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
});

global.signin = (id?: string) => {
  // Build a JWT paylload {id, email}

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@tes.com',
  };
  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build a session object {jwt: MY_JWT}
  const session = { jwt: token };
  // Turn in into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // Return a string thats the cookie for the session
  return [`express:sess=${base64}`];
};
