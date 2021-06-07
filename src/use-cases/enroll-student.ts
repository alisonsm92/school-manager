import Cpf from "../entities/cpf";
import Enrollment from "../entities/enrollment";
import EnrollmentRequest from "../entities/enrollment-request";
import Name from "../entities/name";

const byCpf = (cpf: string) => (enrollmentRequest: EnrollmentRequest) => enrollmentRequest.student.cpf === cpf;

export default class EnrollStudent {
    private enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        const name = new Name(enrollmentRequest.student.name);
        if(!name.isValid()) {
            throw new Error('Invalid student name');
        }
        const cpf = new Cpf(enrollmentRequest.student.cpf);
        if(!cpf.isValid()) {
            throw new Error('Invalid student cpf');
        }
        if(this.enrollments.find(byCpf(enrollmentRequest.student.cpf))) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        const enrollment: Enrollment = {
            student: {
                name: enrollmentRequest.student.name,
                cpf: enrollmentRequest.student.cpf
            }
        }
        this.enrollments.push(enrollment);

        return enrollment;
    }
}