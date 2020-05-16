import { Subjects } from "./subject";
export interface TicketUpdatedEvent {
  subjects: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
