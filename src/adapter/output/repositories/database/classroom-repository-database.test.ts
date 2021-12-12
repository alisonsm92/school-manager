import Classroom from '../../../../domain/entities/classroom'
import connectionPool from '../../../../infra/database/connection-pool'
import ClassroomRepositoryDatabase from './classroom-repository-database'

const inputData = {
  level: 'EM',
  module: '1',
  code: 'A',
  capacity: 10,
  startDate: new Date('2021-05-01'),
  endDate: new Date('2021-06-30')
}

let sut: ClassroomRepositoryDatabase

beforeEach(() => {
  sut = new ClassroomRepositoryDatabase()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await connectionPool.end()
})

describe('Testing ClassRepositoryDatabase', () => {
  describe('Find and Add method', () => {
    test('Should return the classroom with code provided when it exists', async () => {
      await sut.add(new Classroom(inputData))
      const classroom = await sut.find('EM', '1', 'A')
      expect(classroom).toHaveProperty('code', 'A')
      expect(classroom).toHaveProperty('level', 'EM')
      expect(classroom).toHaveProperty('module', '1')
      expect(classroom).toHaveProperty('capacity', 10)
      expect(classroom).toHaveProperty('startDate', new Date('2021-05-01'))
      expect(classroom).toHaveProperty('endDate', new Date('2021-06-30'))
    })

    test('Should return undefined when the classroom it is not exists', async () => {
      const classroom = await sut.find('EM', '1', 'A')
      expect(classroom).toBeUndefined()
    })
  })

  describe('Update method', () => {
    test('Should update the capacity with the number provided', async () => {
      await sut.add(new Classroom(inputData))
      await sut.update(new Classroom({ ...inputData, capacity: 11 }))
      const classroom = await sut.find('EM', '1', 'A')
      expect(classroom).toHaveProperty('code', 'A')
      expect(classroom).toHaveProperty('level', 'EM')
      expect(classroom).toHaveProperty('module', '1')
      expect(classroom).toHaveProperty('capacity', 11)
      expect(classroom).toHaveProperty('startDate', new Date('2021-05-01'))
      expect(classroom).toHaveProperty('endDate', new Date('2021-06-30'))
    })
  })

  describe('Clean method', () => {
    test('Should not found the register added', async () => {
      await sut.add(new Classroom(inputData))
      await sut.clean()
      const classroom = await sut.find('EM', '1', 'A')
      expect(classroom).toBeUndefined()
    })
  })
})
