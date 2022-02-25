import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import RegisterClassroomInputData from '../data/register-classroom-input-data'
import ResourceNotFound from '../errors/resource-not-found'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import ClassroomRepository from '../repositories/classroom-repository'
import DateHelper from '../../../test/helpers/date'
import RegisterClassroom from './register-classroom'
import LevelBuilder from '../../../test/builders/level-builder'
import ModuleBuilder from '../../../test/builders/module-builder'

const inputData = new RegisterClassroomInputData({
  level: 'EM',
  module: '1',
  code: 'A',
  capacity: 10,
  startDate: new Date().toISOString(),
  endDate: DateHelper.getDateAfter({ days: 30 }).toISOString()
})

let sut: RegisterClassroom
let repositoryFactory: RepositoryAbstractFactory
let classroomRepository: ClassroomRepository

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  repositoryFactory.createModuleRepository().add(new ModuleBuilder().build())
  classroomRepository = repositoryFactory.createClassroomRepository()
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  sut = new RegisterClassroom(repositoryFactory)
  prePopulateRepositories()
})

afterEach(async function () {
  await classroomRepository.clean()
})

describe('Testing register classroom', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    await sut.execute(inputData)
    const classroom = await classroomRepository.find(inputData.level, inputData.module, inputData.code)
    expect(classroom).toBeDefined()
  })

  test('Should not register when the level provided not exists', async () => {
    const invalidInputData = { ...inputData, level: 'non_existing_level_code' }
    await expect(sut.execute(invalidInputData)).rejects.toThrow(new ResourceNotFound('Level'))
  })

  test('Should not register when the module provided not exists', async () => {
    const invalidInputData = { ...inputData, module: 'non_existing_module_code' }
    await expect(sut.execute(invalidInputData)).rejects.toThrow(new ResourceNotFound('Module'))
  })
})
