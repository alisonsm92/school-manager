import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import EnrollModuleInputData from '../data/enroll-module-input-data'
import ResourceNotFound from '../errors/resource-not-found'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import ModuleRepository from '../repositories/module-repository'
import LevelBuilder from '../__test__/builders/level-builder'
import EnrollModule from './enroll-module'

const inputData = new EnrollModuleInputData({
  level: 'EM',
  code: '1',
  description: '1o Ano',
  minimumAge: 15,
  price: 17000
})

let sut: EnrollModule
let repositoryFactory: RepositoryAbstractFactory
let moduleRepository: ModuleRepository

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  moduleRepository = repositoryFactory.createModuleRepository()
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  sut = new EnrollModule(repositoryFactory)
  prePopulateRepositories()
})

afterEach(async function () {
  await moduleRepository.clean()
})

describe('Testing enroll module', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    await sut.execute(inputData)
    const module = await moduleRepository.find(inputData.level, inputData.code)
    expect(module).toBeDefined()
  })

  test('Should not enroll when the level provided not exists', async () => {
    const invalidInputData = { ...inputData, level: 'non_existing_level_code' }
    await expect(sut.execute(invalidInputData)).rejects.toThrow(new ResourceNotFound('Level'))
  })
})
