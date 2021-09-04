import Enrollment from "../entities/enrollment";
import EnrollmentCode from "../entities/enrollment-code";
import EnrollmentRepository from "./ports/enrollment-repository";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute(code: EnrollmentCode): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return enrollment;
    }
}