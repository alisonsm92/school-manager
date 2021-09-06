import Invoice from "../entities/invoice";
import EnrollmentRepository from "./ports/enrollment-repository";
import PayInvoiceRequest from "./ports/pay-invoice-request";

const byDate = (month: number, year: number) => (invoice: Invoice) => {
    return invoice.month === month && invoice.year === year;
}

export default class PayInvoice {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute(requestData: PayInvoiceRequest) {
        const enrollment = this.enrollmentRepository.findByCode(requestData.code);
        if(!enrollment) throw new Error('Enrollment not found');
        const invoice = enrollment.invoices.find(byDate(requestData.month, requestData.year));
        if(!invoice) throw new Error('Invoice not found');
        invoice.pay(requestData.amount);
        enrollment.updateInvoicesBalance();
        this.enrollmentRepository.update(enrollment);
    }
}