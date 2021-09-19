import InvoiceEvent from "./invoiceEvent";

export default class Invoice {
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
}