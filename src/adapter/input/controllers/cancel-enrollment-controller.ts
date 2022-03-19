import ResourceNotFound from '../../../domain/errors/resource-not-found'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import CancelEnrollment from '../../../domain/usecases/cancel-enrollment'
import NotFound from '../../output/http/not-found'
import HttpRequest from '../http/http-request'
import Controller from './controller'

interface CancelEnrollmentRequest extends HttpRequest {
    params: { code: string }
}

export default class CancelEnrollmentController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: CancelEnrollmentRequest): Promise<void> {
      try {
        const { code } = httpRequest.params
        const cancelEnrollment = new CancelEnrollment(this.repositoryFactory)
        return await cancelEnrollment.execute(code)
      } catch (e: unknown) {
        if (e instanceof ResourceNotFound) throw new NotFound(e.message)
        throw e
      }
    }
}
