import mongoose from 'mongoose';
import { app } from './app';
const port = 3000;
// Connecting DB
const start = async () => {
  console.log('Starting up....');
  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY definition');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

start();
