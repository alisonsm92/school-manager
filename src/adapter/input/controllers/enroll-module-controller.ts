import EnrollModuleInputData from '../../../domain/data/enroll-module-input-data'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import EnrollModule from '../../../domain/usecases/enroll-module'
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
      const inputData = new EnrollModuleInputData(httpRequest.body)
      const enrollModule = new EnrollModule(this.repositoryFactory)
      const enrollModuleOutputData = await enrollModule.execute(inputData)
      return enrollModuleOutputData
    }
}
