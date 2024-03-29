import DateHelper from '../../../test/helpers/date'
import EnrollStudent from './enroll-student'
import EnrollStudentInputData from '../contracts/enroll-student-input-data'
import LevelBuilder from '../../../test/builders/level-builder'
import ModuleBuilder from '../../../test/builders/module-builder'
import ClassroomBuilder from '../../../test/builders/classroom-builder'
import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import GetEnrollment from './get-enrollment'
import GetEnrollmentOutputData from '../contracts/get-enrollment-output-data'
import ClassroomRepository from '../repositories/classroom-repository'
import InvalidInputError from '../errors/invalid-input'

const inputData = new EnrollStudentInputData({
  student: {
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: '2002-03-12T00:00:00.000Z'
  },
  level: 'EM',
  module: '1',
  classroom: 'A',
  installments: 12
})
const aMonthAgo = DateHelper.getDateBefore({ days: 30 })
const aMonthAfter = DateHelper.getDateAfter({ days: 30 })

let sut: EnrollStudent
let getEnrollment: GetEnrollment
let repositoryFactory: RepositoryAbstractFactory
let classroomRepository: ClassroomRepository

function sumInvoicesAmount (accumulator: number, current: GetEnrollmentOutputData['invoices'][number]) {
  return accumulator + current.amount
}

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  repositoryFactory.createModuleRepository().add(new ModuleBuilder().build())
  classroomRepository = repositoryFactory.createClassroomRepository()
  classroomRepository.add(new ClassroomBuilder().build())
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  getEnrollment = new GetEnrollment(repositoryFactory)
  sut = new EnrollStudent(repositoryFactory)
  prePopulateRepositories()
})

describe('Testing enroll student', () => {
  test('Should fullfil successfully when provide a valid input data', async () => {
    const enrollment = await sut.execute(inputData)
    expect(enrollment).toHaveProperty('code', `${DateHelper.getCurrentYear()}EM1A0001`)
  })

  test('Should not enroll without valid student name', async () => {
    const student: EnrollStudentInputData['student'] = { ...inputData.student, name: 'Ana' }
    const error = new InvalidInputError('Invalid student name')
    await expect(sut.execute({ ...inputData, student })).rejects.toThrow(error)
  })

  test('Should not enroll without valid student cpf', async () => {
    const student: EnrollStudentInputData['student'] = {
      ...inputData.student,
      cpf: '123.456.789-99'
    }
    const error = new InvalidInputError('Invalid student cpf')
    await expect(sut.execute({ ...inputData, student })).rejects.toThrow(error)
  })

  test('Should not enroll duplicated student', async () => {
    const error = new InvalidInputError('Enrollment with duplicated student is not allowed')
    await sut.execute(inputData)
    await expect(sut.execute(inputData)).rejects.toThrow(error)
  })

  test('Should generate enrollment code', async () => {
    const result = await sut.execute(inputData)
    expect(result).toHaveProperty('code', `${DateHelper.getCurrentYear()}EM1A0001`)
  })

  test('Should not enroll student below minimum age', async () => {
    const student: EnrollStudentInputData['student'] = {
      ...inputData.student,
      birthDate: '2012-03-12T00:00:00.000Z'
    }
    const error = new InvalidInputError('Student below minimum age')
    await expect(sut.execute({ ...inputData, student })).rejects.toThrow(error)
  })

  test('Should not enroll student over classroom capacity', async () => {
    const classroom = new ClassroomBuilder().withCapacity(1).build()
    classroomRepository.update(classroom)
    const secondStudent: EnrollStudentInputData['student'] = {
      ...inputData.student,
      name: 'Pedro da Silva',
      cpf: '151.906.420-97'
    }
    const error = new InvalidInputError('Class is over capacity')
    await sut.execute(inputData)
    await expect(sut.execute({ ...inputData, student: secondStudent })).rejects.toThrow(error)
  })

  test('Should not enroll after que end of the classroom', async () => {
    const yesterDay = DateHelper.getDateBefore({ days: 1 })
    const classroom = new ClassroomBuilder()
      .withStartDate(aMonthAgo)
      .withEndDate(yesterDay)
      .build()
    classroomRepository.update(classroom)
    await expect(sut.execute(inputData)).rejects.toThrow(new InvalidInputError('Class is already finished'))
  })

  test('Should not enroll after 25% of the start of the classroom', async () => {
    const classroom = new ClassroomBuilder()
      .withStartDate(aMonthAgo)
      .withEndDate(aMonthAfter)
      .build()
    classroomRepository.update(classroom)
    await expect(sut.execute(inputData)).rejects.toThrow(new InvalidInputError('Class is already started'))
  })

  test('Should generate the invoices based on the number of installments, rounding each amount ' +
        'and applying the rest in the last invoice', async () => {
    const { code } = await sut.execute(inputData)
    const { invoices } = await getEnrollment.execute({ code, currentDate: new Date() })
    const [firstInvoice] = invoices
    const lastInvoice = invoices[invoices.length - 1]
    const invoicesTotalAmount = invoices.reduce(sumInvoicesAmount, 0)
    expect(invoices).toHaveLength(inputData.installments)
    expect(invoicesTotalAmount).toBe(new ModuleBuilder().build().price)
    expect(firstInvoice.amount).toBe(1416.66)
    expect(lastInvoice.amount).toBe(1416.74)
  })
})
