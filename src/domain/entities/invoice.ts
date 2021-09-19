import Currency from "./currency";
import InvoiceEvent from "./invoiceEvent";
import Period from "./period";
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
    private readonly penaltyPercentage = 0.10;
    private readonly interestPercentage = 0.01;

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

    getPenalty(currentDate: Date) {
        if(this.getStatus(currentDate) === InvoiceStatus.OPENED) return 0;
        const penalty = new Currency(this.amount * this.penaltyPercentage);
        penalty.roundUp();
        return penalty.value;
    }

    getInterests(currentDate: Date) {
        if(this.getStatus(currentDate) === InvoiceStatus.OPENED) return 0;
        const daysDiff = new Period(this.dueDate, currentDate).getDiffInDays() - 1;
        const penalty = new Currency(this.amount * (daysDiff * this.interestPercentage));
        penalty.roundUp();
        return penalty.value;
    }

    clone(): Invoice {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}