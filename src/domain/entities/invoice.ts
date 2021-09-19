import InvoiceEvent from "./invoiceEvent";
import Prototype from "./prototype";

export enum InvoiceStatus {
    OPENED = 'opened',
    OVERDUE = 'overdue'
}

export default class Invoice implements Prototype {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;
    events: InvoiceEvent[];
    readonly dueDate: Date;

    constructor({ code, month, year, amount }: 
        { code: string, month: number, year: number, amount: number }) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.events = [];
        this.dueDate = new Date(`${year}-${month}-05`);
    }

    addEvent(invoiceEvent: InvoiceEvent) {
        this.events.push(invoiceEvent);
    }

    getBalance() {
        return this.events.reduce((total, event) => total - event.amount, this.amount);
    }

    getStatus(currentDate: Date) {
        return this.dueDate < currentDate
            ? InvoiceStatus.OVERDUE 
            : InvoiceStatus.OPENED;
    }

    clone(): Invoice {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}