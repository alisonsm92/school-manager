import { EnrollmentStatus } from '../../../../domain/entities/enrollment'
import EnrollmentBuilder from '../../../../domain/__test__/builders/enrollment-builder'
import ConnectionPool from '../../../../infra/database/postgresql'
import ClassroomRepositoryDatabase from './classroom-repository-database'
import EnrollmentRepositoryDatabase from './enrollment-repository-database'
import LevelRepositoryDatabase from './level-repository-database'
import ModuleRepositoryDatabase from './module-repository-database'

let sut: EnrollmentRepositoryDatabase
let levelRepository: LevelRepositoryDatabase
let moduleRepository: ModuleRepositoryDatabase
let classroomRepository: ClassroomRepositoryDatabase
const inputData = new EnrollmentBuilder().build()
const connectionPool = new ConnectionPool()

const prePopulateRepositories = async () => await Promise.all([
  levelRepository.add(inputData.level),
  moduleRepository.add(inputData.module),
  classroomRepository.add(inputData.classroom)
])

beforeAll(async () => {
  sut = new EnrollmentRepositoryDatabase(connectionPool)
  levelRepository = new LevelRepositoryDatabase(connectionPool)
  moduleRepository = new ModuleRepositoryDatabase(connectionPool)
  classroomRepository = new ClassroomRepositoryDatabase(connectionPool)
  await Promise.all([
    sut.clean(),
    levelRepository.clean(),
    moduleRepository.clean(),
    classroomRepository.clean()
  ])
  await prePopulateRepositories()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await Promise.all([
    levelRepository.clean(),
    moduleRepository.clean(),
    classroomRepository.clean()
  ])
  await connectionPool.end()
})

describe('Testing EnrollmentRepositoryDatabase', () => {
  describe('FindByCode method', () => {
    test('Should return the enrollment with code provided when it exists', async () => {
      await sut.add(inputData)
      const result = await sut.findByCode(inputData.code.value)
      expect(result).toEqual(inputData)
    })

    test('Should return undefined when enrollment with the code provided not exists', async () => {
      const result = await sut.findByCode(inputData.code.value)
      expect(result).toBeUndefined()
    })
  })

  describe('FindByCpf method', () => {
    test('Should return the enrollment with cpf provided when it exists', async () => {
      await sut.add(inputData)
      const result = await sut.findByCpf(inputData.student.cpf.value)
      expect(result).toEqual(inputData)
    })

    test('Should return undefined when enrollment with the cpf provided not exists', async () => {
      const result = await sut.findByCpf(inputData.student.cpf.value)
      expect(result).toBeUndefined()
    })
  })

  describe('Count method', () => {
    test('Should return 1 when insert a enrollment in the database', async () => {
      await sut.add(inputData)
      const result = await sut.count()
      expect(result).toBe(1)
    })

    test('Should return 0 when there no enrollment register in the database', async () => {
      const result = await sut.count()
      expect(result).toBe(0)
    })
  })

  describe('Update method', () => {
    test('Should return the enrollment with the data updated', async () => {
      await sut.add(inputData)
      inputData.status = EnrollmentStatus.CANCELLED
      await sut.update(inputData)
      const enrollmentAfterUpdate = await sut.findByCode(inputData.code.value)
      expect(enrollmentAfterUpdate?.status).toBe(EnrollmentStatus.CANCELLED)
    })
  })
})
