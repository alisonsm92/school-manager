import Cpf from "./cpf";
import EnrollmentRequest from "./enrollment-request";
import Name from "./name";

export default class EnrollStudent {
    execute(enrollmentRequest: EnrollmentRequest) {
        const name = new Name(enrollmentRequest.student.name);
        if(!name.isValid()) {
            throw new Error('Invalid student name');
        }
        const cpf = new Cpf(enrollmentRequest.student.cpf);
        if(!cpf.isValid()) {
            throw new Error('Invalid student cpf');
        }

        return true;
    }
}