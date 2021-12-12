import Level from '../../../../domain/entities/level'
import LevelRepositoryMemory from './level-repository-memory'

const inputData = {
  code: 'EM',
  description: 'Ensino Médio'
}

let sut: LevelRepositoryMemory

beforeEach(() => {
  sut = new LevelRepositoryMemory()
})

afterEach(async () => {
  await sut.clean()
})

describe('Testing LevelRepositoryMemory', () => {
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
