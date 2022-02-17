import EnrollModuleInputData from '../../../domain/data/enroll-module-input-data'
import ResourceNotFound from '../../../domain/errors/resource-not-found'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import EnrollModule from '../../../domain/usecases/enroll-module'
import BadRequest from '../../output/http/bad-request'
import { HttpRequest } from '../http/http-request'
import Controller from './controller'

interface EnrollModuleRequest extends HttpRequest {
    body: {
        level: string,
        code: string,
        description: string,
        minimumAge: number,
        price: number
    }
}

export default class EnrollModuleController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: EnrollModuleRequest): Promise<void> {
      try {
        const inputData = new EnrollModuleInputData(httpRequest.body)
        const enrollModule = new EnrollModule(this.repositoryFactory)
        const enrollModuleOutputData = await enrollModule.execute(inputData)
        return enrollModuleOutputData
      } catch (e: unknown) {
        if (e instanceof ResourceNotFound) throw new BadRequest(e.message)
        throw e
      }
    }
}
