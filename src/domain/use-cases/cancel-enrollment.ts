import EnrollmentCode from "../entities/enrollment-code";
import EnrollmentRepository from "./ports/enrollment-repository";

type RequestData = {
    code: EnrollmentCode['value'];
};

export default class CancelEnrollment {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    
    execute({ code }: RequestData) {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.cancel();
    }
}