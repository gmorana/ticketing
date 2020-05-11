import express from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import { json } from 'body-parser';

import { erroHandler, NotFoundError } from '@baritrade/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
// All Routers

// Handling not found routes
app.all('*', async () => {
  throw new NotFoundError();
});
// Error Handling
app.use(erroHandler);
export { app };
