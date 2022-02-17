import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import EnrollLevelInputData from '../data/enroll-level-input-data'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'
import LevelBuilder from '../__test__/builders/level-builder'
import EnrollLevel from './enroll-level'

const inputData = new EnrollLevelInputData({
  code: 'EM',
  description: 'Ensino Médio'
})

let sut: EnrollLevel
let repositoryFactory: RepositoryAbstractFactory
let levelRepository: LevelRepository

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  levelRepository = repositoryFactory.createLevelRepository()
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  sut = new EnrollLevel(repositoryFactory)
  prePopulateRepositories()
})

afterEach(async function () {
  await levelRepository.clean()
})

describe('Testing enroll level', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    await sut.execute(inputData)
    const level = await levelRepository.find(inputData.code)
    expect(level).toBeDefined()
  })
})
