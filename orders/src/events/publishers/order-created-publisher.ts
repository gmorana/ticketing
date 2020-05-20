import { Subjects, OrderCreatedEvent, Publisher } from "@baritrade/common";
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
