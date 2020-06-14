import express from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import { json } from 'body-parser';

import { erroHandler, NotFoundError, currentUser } from '@baritrade/common';
import { createChargeRouter } from './routes/new';
const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

// All Routers
app.use(createChargeRouter);

// Handling not found routes
app.all('*', async () => {
  throw new NotFoundError();
});
// Error Handling
app.use(erroHandler);
export { app };
