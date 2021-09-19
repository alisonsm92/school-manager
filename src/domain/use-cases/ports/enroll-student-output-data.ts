import Enrollment from "../../entities/enrollment";

const extractAmount = ({ amount }: Enrollment['invoices'][number]) => ({ amount });

export default class EnrollStudentOutputData {
    readonly code: string;
    readonly invoices: {
        amount: number
    }[];

    constructor(enrollment: Enrollment) {
        this.code = enrollment.code.value;
        this.invoices = enrollment.invoices.map(extractAmount);
    }
}