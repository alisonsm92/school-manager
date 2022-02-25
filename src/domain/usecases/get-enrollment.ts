import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import GetEnrollmentInputData from '../contracts/get-enrollment-input-data'
import GetEnrollmentOutputData from '../contracts/get-enrollment-output-data'
import EnrollmentRepository from '../repositories/enrollment-repository'
import ResourceNotFound from '../errors/resource-not-found';

export default class GetEnrollment {
    private readonly enrollmentRepository: EnrollmentRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
    }

    async execute ({ code, currentDate }: GetEnrollmentInputData): Promise<GetEnrollmentOutputData> {
      const enrollment = await this.enrollmentRepository.findByCode(code)
      if (!enrollment) throw new ResourceNotFound('Enrollment')
      return new GetEnrollmentOutputData(enrollment, currentDate)
    }
}
