export default class Invoice {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;

    constructor({ code, month, year, amount }: 
        { code: string, month: number, year: number, amount: number }) {
        this.code = code;
        this.month = month;
        this.year = year;
        this.amount = amount;
    }
}