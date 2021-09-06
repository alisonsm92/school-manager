export enum InvoiceStatus {
    PENDING = 'pending',
    PAID = 'paid'
}

export default class Invoice {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;
    status: InvoiceStatus;

    constructor({ code, month, year, amount }: 
        { code: string, month: number, year: number, amount: number }) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
        this.status = InvoiceStatus.PENDING;
    }

    pay(amount: number) {
        if(amount !== this.amount)  throw new Error('Pay amount is not equals to invoice amount');
        this.status = InvoiceStatus.PAID;
    }
}