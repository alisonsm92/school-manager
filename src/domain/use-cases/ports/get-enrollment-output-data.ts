import Enrollment, { EnrollmentStatus } from "../../entities/enrollment";

export default class GetEnrollmentOutputData {
    readonly code: string;
    readonly student: {
        name: string,
        cpf: string,
        birthDate: Date
    };
    readonly balance: number;
    readonly status: EnrollmentStatus;

    constructor(enrollment: Enrollment) {
        this.code = enrollment.code.value;
        this.student = {
            name: enrollment.student.name,
            cpf: enrollment.student.cpf,
            birthDate: enrollment.student.birthDate
        };
        this.balance = enrollment.getInvoicesBalance();
        this.status = enrollment.status
    }
}