import RepositoryAbstractFactory from "../factories/repository-abstract-factory";
import CancelEnrollmentInputData from "../ports/cancel-enrollment-input-data";
import EnrollmentRepository from "../repositories/enrollment-repository";


export default class CancelEnrollment {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
    }
    
    async execute({ code }: CancelEnrollmentInputData): Promise<void> {
        const enrollment = await this.enrollmentRepository.findByCode(code);
        if(!enrollment) throw new Error('Enrollment not found');
        enrollment.cancel();
    }
}