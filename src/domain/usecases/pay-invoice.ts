import RepositoryAbstractFactory from "../factories/repository-abstract-factory";
import PayInvoiceInputData from "../ports/pay-invoice-input-data";
import EnrollmentRepository from "../repositories/enrollment-repository";

export default class PayInvoice {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    execute({ code, month, year, amount, paymentDate }: PayInvoiceInputData): void {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.payInvoice(month, year, amount, paymentDate);
    }
}