import Invoice from "../entities/invoice";
import EnrollmentRepository from "./ports/enrollment-repository";
import PayInvoiceInputData from "./ports/pay-invoice-input-data";

const byDate = (month: number, year: number) => (invoice: Invoice) => {
    return invoice.month === month && invoice.year === year;
}

export default class PayInvoice {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute({ code, month, year, amount }: PayInvoiceInputData): void {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        const invoice = enrollment.invoices.find(byDate(month, year));
        if(!invoice) throw new Error('Invoice not found');
        invoice.pay(amount);
        enrollment.updateInvoicesBalance();
        this.enrollmentRepository.update(enrollment);
    }
}