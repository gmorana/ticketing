import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickests fro post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});
it("can only be accesed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});
it("return an error if an invalid title was provided", async () => {});
it("return an error if an invalid price was provided", async () => {});
it("creates a ticket with valid inputs", async () => {});
