import app from '../server';
import { dbConnect, dbDisconnect, dbDelete } from './utils/dbHandler.utils';
import mongoose from 'mongoose';
import supertest from 'supertest';
import IUser from '../models/IUser';
const request = supertest(app);


describe("Smoke tests", () => {
    it("Jest works", async () => {
        expect(1).toBe(1);
    });

    it("Supertest works", async () => {
        const response = await request.get("/invalid_endpoint");

        expect(response.status).toBe(404);
    });

    it("Database works", async () => {
        await dbConnect();

        const TestModel = mongoose.model(
            "test",
            new mongoose.Schema<IUser>({
                name: String,
            })
        );

        const test = new TestModel({ name: "testName" });
        await test.save();

        const doc = await TestModel.findOne();

        await dbDelete([TestModel]);
        const result = await TestModel.countDocuments();
        
        // @ts-ignore
        expect(doc.name).toBe("testName");
        expect(result).toBe(0);

        await dbDisconnect();
    });
});
