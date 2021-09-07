import EnrollmentRepository from "./ports/enrollment-repository";
import GetEnrollmentInputData from "./ports/get-enrollment-input-data";
import GetEnrollmentOutputData from "./ports/get-enrollment-output-data";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(enrollmentRepository: EnrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    execute({ code }: GetEnrollmentInputData): GetEnrollmentOutputData {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return {
            code: enrollment.code.value,
            student: {
                name: enrollment.student.name,
                cpf: enrollment.student.cpf,
                birthDate: enrollment.student.birthDate
            },
            balance: enrollment.balance,
            status: enrollment.status
        };
    }
}