import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import RegisterLevelInputData from '../contracts/register-level-input-data'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'
import LevelBuilder from '../../../test/builders/level-builder'
import RegisterLevel from './register-level'

const inputData = new RegisterLevelInputData({
  code: 'EM',
  description: 'Ensino Médio'
})

let sut: RegisterLevel
let repositoryFactory: RepositoryAbstractFactory
let levelRepository: LevelRepository

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  levelRepository = repositoryFactory.createLevelRepository()
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  sut = new RegisterLevel(repositoryFactory)
  prePopulateRepositories()
})

afterEach(async function () {
  await levelRepository.clean()
})

describe('Testing register level', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    await sut.execute(inputData)
    const level = await levelRepository.find(inputData.code)
    expect(level).toBeDefined()
  })
})
