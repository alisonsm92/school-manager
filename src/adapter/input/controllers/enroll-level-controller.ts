import EnrollLevelInputData from '../../../domain/data/enroll-level-input-data'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import EnrollLevel from '../../../domain/usecases/enroll-level'
import { HttpRequest } from '../http/http-request'
import Controller from './controller'

interface EnrollLevelRequest extends HttpRequest {
    body: {
        code: string,
        description: string
    }
}

export default class EnrollLevelController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: EnrollLevelRequest): Promise<void> {
      const inputData = new EnrollLevelInputData(httpRequest.body)
      const enrollLevel = new EnrollLevel(this.repositoryFactory)
      const enrollLevelOutputData = await enrollLevel.execute(inputData)
      return enrollLevelOutputData
    }
}
