import RepositoryAbstractFactory from "../factories/repository-abstract-factory";
import GetEnrollmentInputData from "../ports/get-enrollment-input-data";
import GetEnrollmentOutputData from "../ports/get-enrollment-output-data";
import EnrollmentRepository from "../repositories/enrollment-repository";

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