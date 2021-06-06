import Cpf from "../entities/cpf";
import EnrollmentRequest from "../entities/enrollment-request";
import Name from "../entities/name";
import Student from "../entities/student";

const byCpf = (cpf: string) => (student: Student) => student.cpf === cpf;

export default class EnrollStudent {
    private insertedStudents: Student[];

    constructor() {
        this.insertedStudents = [];
    }

    execute(enrollmentRequest: EnrollmentRequest) {
        const { student } = enrollmentRequest;
        const name = new Name(student.name);
        if(!name.isValid()) {
            throw new Error('Invalid student name');
        }
        const cpf = new Cpf(student.cpf);
        if(!cpf.isValid()) {
            throw new Error('Invalid student cpf');
        }
        if(this.insertedStudents.find(byCpf(student.cpf))) {
            throw new Error('Enrollment with duplicated student is not allowed');
        }
        this.insertedStudents.push(student);

        return true;
    }
}