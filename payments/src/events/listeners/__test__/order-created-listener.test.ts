import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@baritrade/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: '1000',
    userId: 'Zuly',
    status: OrderStatus.Created,
    ticket: {
      id: 'abcd',
      price: 20,
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it('replicated the order info', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});
it('ack Message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  msg.ack();
  expect(msg.ack).toHaveBeenCalled();
});
