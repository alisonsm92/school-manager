import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import RepositoryMemoryFactory from '../../adapter/output/factories/repository-memory-factory'
import EnrollStudent from './enroll-student'
import GetEnrollment from './get-enrollment'
import PayInvoice from './pay-invoice'
import EnrollStudentInputData from '../data/enroll-student-input-data'
import PayInvoiceInputData from '../data/pay-invoice-input-data'
import ClassroomBuilder from '../__test__/builders/classroom-builder'
import LevelBuilder from '../__test__/builders/level-builder'
import ModuleBuilder from '../__test__/builders/module-builder'
import GetEnrollmentOutputData from '../data/get-enrollment-output-data'
import { InvoiceStatus } from '../entities/invoice'

const enrollStudentInputData = new EnrollStudentInputData({
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
const currentDate = new Date(`${currentYear}-06-20`)

let repositoryFactory: RepositoryAbstractFactory
let enrollStudent: EnrollStudent
let getEnrollment: GetEnrollment
let sut: PayInvoice

function prePopulateRepositories () {
  repositoryFactory.createLevelRepository().add(new LevelBuilder().build())
  repositoryFactory.createModuleRepository().add(new ModuleBuilder().build())
  repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build())
}

beforeEach(function () {
  repositoryFactory = new RepositoryMemoryFactory()
  enrollStudent = new EnrollStudent(repositoryFactory)
  getEnrollment = new GetEnrollment(repositoryFactory)
  sut = new PayInvoice(repositoryFactory)
  prePopulateRepositories()
})

const byDueDate = (date: Date) => ({ dueDate }: GetEnrollmentOutputData['invoices'][0]) =>
  dueDate.getTime() === date.getTime()

describe('Testing pay invoice', () => {
  test('Should pay enrollment invoice', async () => {
    const { code } = await enrollStudent.execute(enrollStudentInputData)
    const inputData = new PayInvoiceInputData({
      code,
      month: 7,
      year: 2021,
      amount: 1416.66,
      paymentDate: currentDate
    })
    await sut.execute(inputData)
    const enrollment = await getEnrollment.execute({ code, currentDate })
    const invoice = enrollment.invoices.find(byDueDate(new Date('2021-07-05T03:00:00.000Z')))
    expect(invoice?.status).toBe(InvoiceStatus.PAID)
    expect(invoice?.balance).toBe(0)
    expect(enrollment.balance).toBe(15583.34)
  })

  test('Should pay overdue invoice', async () => {
    const { code } = await enrollStudent.execute(enrollStudentInputData)
    const inputData = new PayInvoiceInputData({
      code,
      month: 1,
      year: currentYear,
      amount: 3895.82,
      paymentDate: currentDate
    })
    await sut.execute(inputData)
    const { invoices: [firstInvoice] } = await getEnrollment.execute({ code, currentDate })
    expect(firstInvoice.status).toBe(InvoiceStatus.PAID)
    expect(firstInvoice.balance).toBe(0)
  })
})
