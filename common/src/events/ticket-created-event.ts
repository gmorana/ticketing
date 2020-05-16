import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  subjects: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
