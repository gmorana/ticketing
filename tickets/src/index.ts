import mongoose from "mongoose";
import { app } from "./app";
const port = 3000;
// Connecting DB
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No JWT_KEY definition");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI has to be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

start();
