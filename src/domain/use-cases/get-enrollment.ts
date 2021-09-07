import Enrollment from "../entities/enrollment";
import EnrollmentRepository from "./ports/enrollment-repository";
import GetEnrollmentInputData from "./ports/get-enrollment-input-data";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute({ code }: GetEnrollmentInputData): Enrollment {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return enrollment;
    }
}