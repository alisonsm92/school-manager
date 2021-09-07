import Enrollment from "../../entities/enrollment";

const extractAmount = ({ amount }: Enrollment['invoices'][number]) => ({ amount });

export default class EnrollStudentOutputData {
    readonly code: string;
    readonly student: {
        name: string,
        cpf: string,
        birthDate: Date
    };
    readonly level: string;
    readonly module: string;
    readonly classroom: string;
    readonly invoices: {
        amount: number
    }[];

    constructor(enrollment: Enrollment) {
        this.code = enrollment.code.value;
        this.student = {
            name: enrollment.student.name,
            cpf: enrollment.student.cpf,
            birthDate: enrollment.student.birthDate,
        };
        this.level = enrollment.level.code;
        this.module = enrollment.module.code;
        this.classroom = enrollment.classroom.code;
        this.invoices = enrollment.invoices.map(extractAmount);
    }
}