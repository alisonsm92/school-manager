import CancelEnrollmentInputData from "./ports/cancel-enrollment-input-data";
import EnrollmentRepository from "./ports/enrollment-repository";

export default class CancelEnrollment {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    
    execute({ code }: CancelEnrollmentInputData) {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.cancel();
    }
}