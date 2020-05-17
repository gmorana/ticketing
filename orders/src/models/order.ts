import moongose from 'mongoose';

// AN interface that describes how to create an user

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

// An interface that describes a User document created
interface OrderDoc extends moongose.Document {
  userId: string;
  status: string;
  experisAt: Date;
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
