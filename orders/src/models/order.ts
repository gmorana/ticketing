import moongose from 'mongoose';
import { OrderStatus } from '@baritrade/common';
import { TicketDoc } from './ticket';
// AN interface that describes how to create an user
export { OrderStatus };
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// An interface that describes a User document created
interface OrderDoc extends moongose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}
// An interface that describes the properties
// that a Order Model has
interface OrderModel extends moongose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new moongose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      emun: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: moongose.Schema.Types.Date,
    },
    ticket: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = moongose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
