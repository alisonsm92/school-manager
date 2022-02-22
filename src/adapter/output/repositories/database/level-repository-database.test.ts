import Level from '../../../../domain/entities/level'
import ConnectionPool from '../../../../infra/database/postgresql'
import LevelRepositoryDatabase from './level-repository-database'

const inputData = {
  code: 'EM',
  description: 'Ensino Médio'
}
const connectionPool = new ConnectionPool()

let sut: LevelRepositoryDatabase

beforeAll(async () => {
  sut = new LevelRepositoryDatabase(connectionPool)
  await sut.clean()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await connectionPool.end()
})

describe('Testing LevelRepositoryDatabase', () => {
  describe('Find and Add method', () => {
    test('Should return the level with code provided when it exists', async () => {
      await sut.add(new Level(inputData))
      const level = await sut.find('EM')
      expect(level).toHaveProperty('code', 'EM')
      expect(level).toHaveProperty('description', 'Ensino Médio')
    })

    test('Should return undefined when the level it is not exists', async () => {
      const level = await sut.find('EM')
      expect(level).toBeUndefined()
    })
  })

  describe('Clean method', () => {
    test('Should not found the register added', async () => {
      await sut.add(new Level(inputData))
      await sut.clean()
      const level = await sut.find('EM')
      expect(level).toBeUndefined()
    })
  })
})
