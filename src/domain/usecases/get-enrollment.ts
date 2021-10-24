import RepositoryAbstractFactory from "../factories/repository-abstract-factory";
import GetEnrollmentInputData from "../data/get-enrollment-input-data";
import GetEnrollmentOutputData from "../data/get-enrollment-output-data";
import EnrollmentRepository from "../repositories/enrollment-repository";

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }

    async execute({ code, currentDate }: GetEnrollmentInputData): Promise<GetEnrollmentOutputData> {
        const enrollment = await this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        return new GetEnrollmentOutputData(enrollment, currentDate);
    }
}