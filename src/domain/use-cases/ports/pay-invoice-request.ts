import EnrollmentCode from "../../entities/enrollment-code";

interface PayInvoiceRequest {
    code: EnrollmentCode['value'],
    month: number,
    year: number,
    amount: number
}

export default PayInvoiceRequest;