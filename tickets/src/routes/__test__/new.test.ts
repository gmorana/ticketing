import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';
it('has a route handler listening to /api/tickests fro post request', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});
it('can only be accesed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});
it('returns a status other than 401 if the user is signed it', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
it('return an error if an invalid title was provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10 })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ price: 10 })
    .expect(400);
});
it('return an error if an invalid price was provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Abba', price: -10 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Abba' })
    .expect(400);
});
it('creates a ticket with valid inputs', async () => {
  //add a check to make that the ticket was saved to the DB
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Abba', price: 10 })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
});
it('publishes an event', async () => {
  const title = 'Abba';
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Abba', price: 10 })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
