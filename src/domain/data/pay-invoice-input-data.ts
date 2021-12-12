export default class PayInvoiceInputData {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;
    readonly paymentDate: Date;

    constructor (inputData: {
        code: string,
        month: number,
        year: number,
        amount: number,
        paymentDate: Date
    }) {
      this.code = inputData.code
      this.month = inputData.month
      this.year = inputData.year
      this.amount = inputData.amount
      this.paymentDate = inputData.paymentDate
    }
}
