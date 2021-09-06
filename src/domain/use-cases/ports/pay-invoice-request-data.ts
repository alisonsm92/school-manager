import EnrollmentCode from "../../entities/enrollment-code";

interface PayInvoiceRequestData {
    code: EnrollmentCode['value'],
    month: number,
    year: number,
    amount: number
}

export default PayInvoiceRequestData;