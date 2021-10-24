import Enrollment, { EnrollmentStatus } from "../entities/enrollment";
import Invoice, { InvoiceStatus } from "../entities/invoice";

const clone = (invoice: Invoice) => invoice.clone();

const formatInvoice = (currentDate: Date) => (invoice: Invoice) => ({
    amount: invoice.amount,
    dueDate: invoice.dueDate,
    status: invoice.getStatus(currentDate),
    penalty: invoice.getPenalty(currentDate),
    interests: invoice.getInterests(currentDate),
    balance: invoice.getBalance()
});

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
        penalty: number,
        interests: number,
        balance: number
    }[];

    constructor(enrollment: Enrollment, currentDate: Date) {
        this.code = enrollment.code.value;
        this.student = {
            name: enrollment.student.name.value,
            cpf: enrollment.student.cpf.value,
            birthDate: enrollment.student.birthDate
        };
        this.balance = enrollment.getInvoicesBalance();
        this.status = enrollment.status;
        this.invoices = enrollment.invoices
            .map(clone)
            .map(formatInvoice(currentDate));
    }
}