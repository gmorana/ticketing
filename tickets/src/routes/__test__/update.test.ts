import request from "supertest";
import moongose from "mongoose";
import { app } from "../../app";

const createTicket = (title: string, price: number) => {
  const id = new moongose.Types.ObjectId().toHexString();
  return request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });
};
const getTicket = () => {
  return createTicket("Abba Concert", 20);
};
it("Provide a 404 if the provide id does not exists", async () => {
  const title = "Abba Concert";
  const price = 20;
  const id = new moongose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(404);
});
it("returns a status other than 401 if the user is signed it", async () => {
  const title = "Abba Concert";
  const price = 20;
  const id = new moongose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title,
      price,
    })
    .expect(401);
});
it("return a 401 if the user does not own the ticket", async () => {
  const title = "Abba Concert";
  const price = 20;
  const ticket = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });
  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(401);
});
it("return a 400 if the user have an invalid title or price", async () => {});

it("A ticket was updated with valid inputs", async () => {});
