import Cpf from "./cpf";
import EnrollmentRequest from "./enrollment-request";

export default class EnrollStudent {
    private static readonly nameRule = /^([A-Za-z]+ )+([A-Za-z])+$/;

    static isValidName(name: string): boolean {
        return this.nameRule.test(name);
    }

    execute(enrollmentRequest: EnrollmentRequest) {
        if(!EnrollStudent.isValidName(enrollmentRequest.student.name)) {
            throw new Error('Invalid student name');
        }

        const cpf = new Cpf(enrollmentRequest.student.cpf);
        if(!cpf.isValid()) {
            throw new Error('Invalid student cpf');
        }

        return true;
    }
}