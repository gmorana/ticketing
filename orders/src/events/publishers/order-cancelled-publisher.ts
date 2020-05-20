import { Subjects, Publisher, OrderCancelledEvent } from "@baritrade/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
