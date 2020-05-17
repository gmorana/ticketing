import { Publisher, Subjects, TicketUpdatedEvent } from '@baritrade/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
