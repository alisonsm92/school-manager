export enum InvoiceEventTypes {
    PAID = 'paid'
}

export default class InvoiceEvent {
    type: InvoiceEventTypes;
    amount: number;

    constructor (type: InvoiceEventTypes, amount: number) {
        this.type = type;
        this.amount = amount;
    }
}