import RegisterModuleInputData from '../../../domain/contracts/register-module-input-data'
import ResourceNotFound from '../../../domain/errors/resource-not-found'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import RegisterModule from '../../../domain/usecases/register-module'
import BadRequest from '../../output/http/bad-request'
import HttpRequest from '../http/http-request'
import Controller from './controller'

interface RegisterModuleRequest extends HttpRequest {
    body: {
        level: string,
        code: string,
        description: string,
        minimumAge: number,
        price: number
    }
}

export default class RegisterModuleController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: RegisterModuleRequest): Promise<void> {
      try {
        const inputData = new RegisterModuleInputData(httpRequest.body)
        const registerModule = new RegisterModule(this.repositoryFactory)
        const registerModuleOutputData = await registerModule.execute(inputData)
        return registerModuleOutputData
      } catch (e: unknown) {
        if (e instanceof ResourceNotFound) throw new BadRequest(e.message)
        throw e
      }
    }
}
