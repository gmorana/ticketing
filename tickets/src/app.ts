import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { json } from "body-parser";

import { erroHandler, NotFoundError, currentUser } from "@baritrade/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// All Routers
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

// Handling not found routes
app.all("*", async () => {
  throw new NotFoundError();
});
// Error Handling
app.use(erroHandler);
export { app };
