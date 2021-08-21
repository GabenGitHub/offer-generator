import app from '../server';
import { dbConnect, dbDisconnect } from './utils/dbHandler.utils';
import supertest from 'supertest';
const request = supertest(app);
import mongoose from 'mongoose';
// const UserModel = require("../models/UserModel");
// const TypeModel = require("../models/typeModell");

let mongoServer;

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Test logout route", () => {
  it("test logout", async () => {
    const response = await request.get("/api/logout");

    expect(response.status).toBe(401);
  });
});

