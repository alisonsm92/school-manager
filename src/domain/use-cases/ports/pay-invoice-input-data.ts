import EnrollmentCode from "../../entities/enrollment-code";

interface PayInvoiceInputData {
    code: EnrollmentCode['value'],
    month: number,
    year: number,
    amount: number
    paymentDate: Date
}

export default PayInvoiceInputData;