import Cpf from "../core/entities/cpf";
import Enrollment from "../core/entities/enrollment";
import EnrollmentRequest from "./ports/enrollment-request";
import Name from "../core/entities/name";
import InvalidCpfError from "../core/errors/invalid-cpf";
import InvalidNameError from "../core/errors/invalid-name";
import Student from "../core/entities/student";

const byCpf = (cpf: string) => (enrollmentRequest: EnrollmentRequest) => 
  enrollmentRequest.student.cpf === cpf;

export default class EnrollStudent {
    private enrollments: Enrollment[];

    constructor() {
        this.enrollments = [];
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        try {
            const student = new Student(
                enrollmentRequest.student.name, 
                enrollmentRequest.student.cpf
            );
            if(this.enrollments.find(byCpf(enrollmentRequest.student.cpf))) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const enrollment: Enrollment = {
                student: {
                    name: student.name,
                    cpf: student.cpf
                }
            }
            this.enrollments.push(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}