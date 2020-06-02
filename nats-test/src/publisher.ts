import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});
stan.on('connect', async () => {
  // console.log("Publisher connected to NATS");
  const data: string = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      version: 0,
      price: 20,
      userId: '123',
    });
  } catch (error) {
    console.log(error);
  }
});
