import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import { EnrollmentStatus } from '../entities/enrollment'
import CancelEnrollment from './cancel-enrollment'
import EnrollStudent from './enroll-student'
import GetEnrollment from './get-enrollment'
import EnrollStudentInputData from '../contracts/enroll-student-input-data'
import ClassroomBuilder from '../../../test/builders/classroom-builder'
import LevelBuilder from '../../../test/builders/level-builder'
import ModuleBuilder from '../../../test/builders/module-builder'

const inputData = new EnrollStudentInputData({
  student: {
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: '2002-03-12T00:00:00.000Z'
  },
  level: 'EM',
  module: '1',
  classroom: 'A',
  installments: 12
})

let repositoryFactory: RepositoryAbstractFactory
let enrollStudent: EnrollStudent
let getEnrollment: GetEnrollment
let sut: CancelEnrollment

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  repositoryFactory.createModuleRepository().add(new ModuleBuilder().build())
  repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build())
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryFactory)
  getEnrollment = new GetEnrollment(repositoryFactory)
  sut = new CancelEnrollment(repositoryFactory)
  prePopulateRepositories()
})

describe('Testing cancel enrollment', () => {
  test('Should cancel enrollment', async () => {
    const { code } = await enrollStudent.execute(inputData)
    await sut.execute(code)
    const getEnrollmentOutput = await getEnrollment.execute({ code, currentDate: new Date() })
    expect(getEnrollmentOutput.status).toBe(EnrollmentStatus.CANCELLED)
  })
})
