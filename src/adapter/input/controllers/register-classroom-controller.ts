import RegisterClassroomInputData from '../../../domain/data/register-classroom-input-data'
import ResourceNotFound from '../../../domain/errors/resource-not-found'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import RegisterClassroom from '../../../domain/usecases/register-classroom'
import BadRequest from '../../output/http/bad-request'
import { HttpRequest } from '../http/http-request'
import Controller from './controller'

interface RegisterClassroomRequest extends HttpRequest {
    body: {
        level: string,
        module: string,
        code: string,
        capacity: number,
        startDate: string,
        endDate: string
    }
}

export default class RegisterClassroomController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: RegisterClassroomRequest): Promise<void> {
      try {
        const inputData = new RegisterClassroomInputData(httpRequest.body)
        const registerClassroom = new RegisterClassroom(this.repositoryFactory)
        const registerClassroomOutputData = await registerClassroom.execute(inputData)
        return registerClassroomOutputData
      } catch (e: unknown) {
        if (e instanceof ResourceNotFound) throw new BadRequest(e.message)
        throw e
      }
    }
}
