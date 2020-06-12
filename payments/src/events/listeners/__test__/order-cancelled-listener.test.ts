import mongoose from 'mongoose';
import { OrderCancelledEvent, OrderStatus } from '@baritrade/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../../listeners/order-cancelled-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';
const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'zuly',
    version: 0,
  });
  await order.save();
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'abcd',
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it('updates the status of the order', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(data.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
it('ack Message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  msg.ack();
  expect(msg.ack).toHaveBeenCalled();
});
