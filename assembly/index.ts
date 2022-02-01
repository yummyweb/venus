import { events, Event } from './model'

export function createEvent(name: string, numOfTickets: i32, place: string): void {
	const ev = new Event(name, numOfTickets, place)
	events.push(ev)
}

export function getEvents(): Event[] {
	const result = new Array<Event>(events.length)
	for(let i = 0; i < events.length; i++) {
		result[i] = events[i]
	}
	return result
}