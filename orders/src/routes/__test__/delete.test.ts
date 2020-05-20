import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "../../models/order";
it("marks an order as cancelled", async () => {
  // create a ticket

  const ticket = await Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send();
  expect(fetchedOrder.status).toEqual(OrderStatus.Cancelled);
});
