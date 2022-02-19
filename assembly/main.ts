import { context, storage, logging, PersistentMap, math } from "near-sdk-as";
import { Event, events, Ticket, tickets } from "./model"

// Event Code

export function createEvent(eventName: string, numOfTickets: i32, place: string, cost: i32, ipfsPath: string, ticketsSold: i32): void {
    const newEvent = new Event(eventName, numOfTickets, place, cost, ipfsPath, ticketsSold)
    events.push(newEvent)
}

export function getEvents(): Event[] {
   const result = new Array<Event>(events.length) 
   for (let i = 0; i < events.length; i++) {
       result[i] = events[i]
   }

   return result
}

export function updateEvent(_eventName: string, buyer: string): void {
    for (let i = 0; i < events.length; i++) {
        if (events[i].name == _eventName) {
            const ticketsSold = events[i].ticketsSold + 1
            events[i] = new Event(events[i].name, events[i].numOfTickets, events[i].place, events[i].cost, events[i].ipfsPath, ticketsSold)
            const newTicket = new Ticket(events[i], buyer, math.hash32Bytes(math.randomBuffer(50)))
            tickets.push(newTicket)
        }
    }
}

// Ticket code
export function getTickets(user: string): Ticket[] {
    const result = new Array<Ticket>(0)
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].buyer == user) {
            result.push(tickets[i])
        }
    }

    return result
}
