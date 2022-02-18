import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import PayInvoiceInputData from '../data/pay-invoice-input-data'
import EnrollmentRepository from '../repositories/enrollment-repository'
import ResourceNotFound from '../errors/resource-not-found';

export default class PayInvoice {
    readonly enrollmentRepository: EnrollmentRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
    }

    async execute ({ code, month, year, amount, paymentDate }: PayInvoiceInputData): Promise<void> {
      const enrollment = await this.enrollmentRepository.findByCode(code)
      if (!enrollment) throw new ResourceNotFound('Enrollment')
      await enrollment.payInvoice(month, year, amount, paymentDate)
      await this.enrollmentRepository.update(enrollment)
    }
}
