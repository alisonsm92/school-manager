import Enrollment from "../core/entities/enrollment";
import EnrollmentRequest from "./ports/enrollment-request";
import InvalidCpfError from "../core/errors/invalid-cpf";
import InvalidNameError from "../core/errors/invalid-name";

const byCpf = (cpf: string) => (enrollment: Enrollment) => enrollment.student.cpf === cpf;

export default class EnrollStudent {
    private enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        try {
            if(this.enrollments.find(byCpf(enrollmentRequest.student.cpf))) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const enrollment = new Enrollment(enrollmentRequest, this.enrollments.length);
            this.enrollments.push(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}