import Enrollment, { EnrollmentStatus } from "../../entities/enrollment";
import Invoice, { InvoiceStatus } from "../../entities/invoice";

function clone(invoice: Invoice) {
    return invoice.clone();
}

function formatInvoice(invoice: Invoice) {
    return {
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        status: invoice.getStatus()
    }
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
    readonly invoices: {
        amount: number,
        dueDate: Date,
        status: InvoiceStatus
    }[];

    constructor(enrollment: Enrollment) {
        this.code = enrollment.code.value;
        this.student = {
            name: enrollment.student.name,
            cpf: enrollment.student.cpf,
            birthDate: enrollment.student.birthDate
        };
        this.balance = enrollment.getInvoicesBalance();
        this.status = enrollment.status;
        this.invoices = enrollment.invoices
            .map(clone)
            .map(formatInvoice);
    }
}