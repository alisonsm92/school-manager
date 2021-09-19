import RepositoryAbstractFactory from "../../app/factories/repository-abstract-factory";
import EnrollmentRepository from "./ports/enrollment-repository";
import GetEnrollmentInputData from "./ports/get-enrollment-input-data";
import GetEnrollmentOutputData from "./ports/get-enrollment-output-data";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    execute({ code, currentDate }: GetEnrollmentInputData): GetEnrollmentOutputData {
        const enrollment = this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return new GetEnrollmentOutputData(enrollment, currentDate);
    }
}