import ResourceNotFound from '../errors/resource-not-found';
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import EnrollmentRepository from '../repositories/enrollment-repository'

export default class CancelEnrollment {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
    }

    async execute (code: string): Promise<void> {
      const enrollment = await this.enrollmentRepository.findByCode(code)
      if (!enrollment) throw new ResourceNotFound('Enrollment')
      enrollment.cancel()
      await this.enrollmentRepository.update(enrollment)
    }
}
