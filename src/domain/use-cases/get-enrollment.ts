import Enrollment from "../entities/enrollment";
import EnrollmentRepository from "./ports/enrollment-repository";
import GetEnrollmentRequestData from "./ports/get-enrollment-request-data";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute({ code }: GetEnrollmentRequestData): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return enrollment;
    }
}