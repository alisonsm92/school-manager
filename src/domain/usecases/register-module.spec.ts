import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import RegisterModuleInputData from '../contracts/register-module-input-data'
import ResourceNotFound from '../errors/resource-not-found'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import ModuleRepository from '../repositories/module-repository'
import LevelBuilder from '../../../test/builders/level-builder'
import RegisterModule from './register-module'

const inputData = new RegisterModuleInputData({
  level: 'EM',
  code: '1',
  description: '1o Ano',
  minimumAge: 15,
  price: 17000
})

let sut: RegisterModule
let repositoryFactory: RepositoryAbstractFactory
let moduleRepository: ModuleRepository

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  moduleRepository = repositoryFactory.createModuleRepository()
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  sut = new RegisterModule(repositoryFactory)
  prePopulateRepositories()
})

afterEach(async function () {
  await moduleRepository.clean()
})

describe('Testing register module', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    await sut.execute(inputData)
    const module = await moduleRepository.find(inputData.level, inputData.code)
    expect(module).toBeDefined()
  })

  test('Should not register when the level provided not exists', async () => {
    const invalidInputData = { ...inputData, level: 'non_existing_level_code' }
    await expect(sut.execute(invalidInputData)).rejects.toThrow(new ResourceNotFound('Level'))
  })
})
