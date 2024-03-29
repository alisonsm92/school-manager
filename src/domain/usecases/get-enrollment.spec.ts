import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import { InvoiceStatus } from '../entities/invoice'
import EnrollStudent from './enroll-student'
import GetEnrollment from './get-enrollment'
import EnrollStudentInputData from '../contracts/enroll-student-input-data'
import ClassroomBuilder from '../../../test/builders/classroom-builder'
import LevelBuilder from '../../../test/builders/level-builder'
import ModuleBuilder from '../../../test/builders/module-builder'
import ModuleRepository from '../repositories/module-repository'

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
const currentYear = new Date().getFullYear()

let repositoryFactory: RepositoryAbstractFactory
let moduleRepository: ModuleRepository
let enrollStudent: EnrollStudent
let sut: GetEnrollment

function prePopulateRepositories () {
  moduleRepository = repositoryFactory.createModuleRepository()
  moduleRepository.add(new ModuleBuilder().build())
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build())
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryFactory)
  sut = new GetEnrollment(repositoryFactory)
  prePopulateRepositories()
})

describe('Testing get enrollment', () => {
  test('Should get enrollment by code with invoice balance', async () => {
    const enrollment = await enrollStudent.execute(inputData)
    const outputData = await sut.execute({ code: enrollment.code, currentDate: new Date() })
    const module = await moduleRepository.find(inputData.level, inputData.module)
    expect(outputData).toHaveProperty('code', enrollment.code)
    expect(outputData).toHaveProperty('student.name', inputData.student.name)
    expect(outputData).toHaveProperty('student.cpf', inputData.student.cpf)
    expect(outputData).toHaveProperty('student.birthDate', new Date(inputData.student.birthDate))
    expect(outputData).toHaveProperty('balance', module?.price)
  })

  test('Should calculate due date and return status open or overdue for each invoice', async () => {
    const { code } = await enrollStudent.execute(inputData)
    const { invoices } = await sut.execute({ code, currentDate: new Date(`${currentYear}-6-20`) })
    const [firstInvoice] = invoices
    const lastInvoice = invoices[invoices.length - 1]
    expect(firstInvoice.dueDate).toEqual(new Date(`${currentYear}-1-05`))
    expect(firstInvoice.status).toBe(InvoiceStatus.OVERDUE)
    expect(lastInvoice.dueDate).toEqual(new Date(`${currentYear}-12-05`))
    expect(lastInvoice.status).toBe(InvoiceStatus.OPENED)
  })

  test('Should calculate penalty and interests', async () => {
    const { code } = await enrollStudent.execute(inputData)
    const { invoices } = await sut.execute({ code, currentDate: new Date(`${currentYear}-6-20`) })
    const [firstInvoice] = invoices
    const lastInvoice = invoices[invoices.length - 1]
    expect(firstInvoice.penalty).toBe(141.67)
    expect(firstInvoice.interests).toBe(2337.49)
    expect(lastInvoice.penalty).toBe(0)
    expect(lastInvoice.interests).toBe(0)
  })
})
