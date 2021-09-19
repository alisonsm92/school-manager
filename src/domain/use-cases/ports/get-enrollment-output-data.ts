import Enrollment, { EnrollmentStatus } from "../../entities/enrollment";
import Invoice from "../../entities/invoice";

function clone(invoice: Invoice) {
    return invoice.clone();
}
export default class GetEnrollmentOutputData {
    readonly code: string;
    readonly student: {
        name: string,
        cpf: string,
        birthDate: Date
    };
    readonly balance: number;
    readonly status: EnrollmentStatus;
    readonly invoices: Invoice[];

    constructor(enrollment: Enrollment) {
        this.code = enrollment.code.value;
        this.student = {
            name: enrollment.student.name,
            cpf: enrollment.student.cpf,
            birthDate: enrollment.student.birthDate
        };
        this.balance = enrollment.getInvoicesBalance();
        this.status = enrollment.status;
        this.invoices = enrollment.invoices.map(clone);
    }
}