import CancelEnrollmentRequestData from "./ports/cancel-enrollment-request-data";
import EnrollmentRepository from "./ports/enrollment-repository";

export default class CancelEnrollment {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    
    execute({ code }: CancelEnrollmentRequestData) {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.cancel();
    }
}