import { context, u128, PersistentVector } from "near-sdk-as"

@nearBindgen
export class Event {
  premium: boolean;
  sender: string;
  constructor(public name: string, public numOfTickets: i32, public place: string, public cost: i32, public ipfsPath: string, public ticketsSold: i32) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender
  }
}

export const events = new PersistentVector<Event>("m")

@nearBindgen
export class Ticket {
    constructor(public event: Event, public buyer: string, public id: u32) {}
}

export const tickets = new PersistentVector<Ticket>("m")
