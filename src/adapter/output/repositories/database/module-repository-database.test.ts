import Module from '../../../../domain/entities/module'
import ConnectionPool from '../../../../infra/database/postgresql'
import ModuleRepositoryDatabase from './module-repository-database'

const inputData = {
  level: 'EM',
  code: '1',
  description: '1o Ano',
  minimumAge: 15,
  price: 17000
}
const connectionPool = new ConnectionPool()

let sut: ModuleRepositoryDatabase

beforeAll(async () => {
  sut = new ModuleRepositoryDatabase(connectionPool)
  await sut.clean()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await connectionPool.end()
})

describe('Testing ModuleRepositoryDatabase', () => {
  describe('Find and Add method', () => {
    test('Should return the module with code provided when it exists', async () => {
      await sut.add(new Module(inputData))
      const module = await sut.find('EM', '1')
      expect(module).toHaveProperty('code', '1')
      expect(module).toHaveProperty('level', 'EM')
      expect(module).toHaveProperty('description', '1o Ano')
      expect(module).toHaveProperty('minimumAge', 15)
      expect(module).toHaveProperty('price', 17000)
    })

    test('Should return undefined when the module it is not exists', async () => {
      const module = await sut.find('EM', '1')
      expect(module).toBeUndefined()
    })
  })

  describe('Clean method', () => {
    test('Should not found the register added', async () => {
      await sut.add(new Module(inputData))
      await sut.clean()
      const module = await sut.find('EM', '1')
      expect(module).toBeUndefined()
    })
  })
})
