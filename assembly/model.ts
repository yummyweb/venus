import { context, PersistentVector } from "near-sdk-as";

@nearBindgen
export class Event {
  sender: string;
  
  constructor(public name: string, public numberOfTickets: i32, public place: string) {
    this.sender = context.sender
    this.name = name
    this.numberOfTickets = numberOfTickets
    this.place = place
  }
}

export const events = new PersistentVector<Event>("v")