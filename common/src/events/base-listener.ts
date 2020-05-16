import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subjects: Subjects;
  data: any;
}
export abstract class Listener<T extends Event> {
  abstract subject: T["subjects"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected ackWait = 5 * 1000;
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  subcriptionsOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subcriptionsOptions()
    );
    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject}/${this.queueGroupName}`);
      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
