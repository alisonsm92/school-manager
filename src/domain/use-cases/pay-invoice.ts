import EnrollmentRepository from "./ports/enrollment-repository";
import PayInvoiceInputData from "./ports/pay-invoice-input-data";

export default class PayInvoice {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute({ code, month, year, amount }: PayInvoiceInputData): void {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.payInvoice(month, year, amount);
    }
}