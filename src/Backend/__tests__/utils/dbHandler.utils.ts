import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: any;

const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const dbDelete = async (models: any[]) => {
  const deletions = models.map(model => model.deleteMany());
  await Promise.all(deletions);
};

export { dbConnect, dbDisconnect, dbDelete }
