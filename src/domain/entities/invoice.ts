import InvoiceEvent from "./invoiceEvent";
import Prototype from "./prototype";

export default class Invoice implements Prototype {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;
    events: InvoiceEvent[];

    constructor({ code, month, year, amount }: 
        { code: string, month: number, year: number, amount: number }) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.events = [];
    }

    addEvent (invoiceEvent: InvoiceEvent) {
        this.events.push(invoiceEvent);
    }

    getBalance () {
        return this.events.reduce((total, event) => total - event.amount, this.amount);
    }

    clone(): Invoice {
        return JSON.parse(JSON.stringify(this));
    }
}