import RegisterLevelInputData from '../../../domain/data/register-level-input-data'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import RegisterLevel from '../../../domain/usecases/register-level'
import { HttpRequest } from '../http/http-request'
import Controller from './controller'

interface RegisterLevelRequest extends HttpRequest {
    body: {
        code: string,
        description: string
    }
}

export default class RegisterLevelController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: RegisterLevelRequest): Promise<void> {
      const inputData = new RegisterLevelInputData(httpRequest.body)
      const registerLevel = new RegisterLevel(this.repositoryFactory)
      const registerLevelOutputData = await registerLevel.execute(inputData)
      return registerLevelOutputData
    }
}
