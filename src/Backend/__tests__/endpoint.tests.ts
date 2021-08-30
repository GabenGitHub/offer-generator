import app from '../server';
import { dbConnect, dbDisconnect } from './utils/dbHandler.utils';
import supertest from 'supertest';
const request = supertest(app);
import mongoose from 'mongoose';
import User from '../models/user';
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

describe("Test register route", () => {
    it("test register with invalid user", async () => {
        const invalidUser = {
            name: "Gabor Szabo",
            password: "test"
        };

        const response = await request.post("/api/register").send(invalidUser);

        expect(response.status).toBe(500);
    });

    it("test register with valid user", async () => {
        const validUser = {
            name: "Gabor Szabo",
            email: "gabor.szabo@example.com",
            password: "test"
        };

        const response = await request.post("/api/register").send(validUser);

        expect(response.status).toBe(201);
    });
});

describe("Test login route", () => {
    it("test login with valid user", async () => {
        const validUser = {
            name: "Gabor Szabo",
            email: "gabor.szabo@example.com",
            password: "test"
        };

        await request.post("/api/register").send(validUser);


        const validUserLogin = {
            email: "gabor.szabo@example.com",
            password: "test"
        };

        const response = await request.post("/api/login").send(validUserLogin);

        expect(response.status).toBe(200);
    });
});

describe("Test offer routes", () => {
    it("test send offer", async () => {
        const validOffer = {
            area: [
                {
                    name: "Budapest",
                    mailbox: 1234567,
                }
            ],
            name: "Gabor Szabo",
            company: "test company",
            email: "gabor.szabo@example.com",
            amount: 12345,
            message: "this is a test",
        };

        const response = await request.post("/api/offer").send(validOffer);

        expect(response.status).toBe(201);
    });
    it("test get offers", async () => {
        const response = await request.get("/api/offers");

        expect(response.status).toBe(401);
    });
});

describe("Test user routes", () => {
    it("test get users", async () => {
        const response = await request.get("/api/users");

        expect(response.status).toBe(401);
    });
    it("test get user", async () => {
        const response = await request.get("/api/user/7kj5l2bn32");

        expect(response.status).toBe(401);
    });
    it("test modify user", async () => {
        const response = await request.put("/api/user/7kj5l2bn32");

        expect(response.status).toBe(401);
    });
    it("test delete user", async () => {
        const response = await request.delete("/api/user/7kj5l2bn32");

        expect(response.status).toBe(401);
    });
});

