import assert from 'assert'
import { Given, When, Then, DataTable, After } from '@cucumber/cucumber'
import { Either, success, fail } from '../../helpers/either'
import {
  registerModule,
  registerLevel,
  registerClassroom,
  enrollStudent,
  getEnrollment
} from '../infra/service-api'
import DataTableParser from '../../helpers/datatable-parser'
import LevelInputDataBuilder from '../../builders/level-input-data-builder'
import ModuleInputDataBuilder from '../../builders/module-input-data-builder'
import ClassroomInputDataBuilder from '../../builders/classroom-input-data-builder'
import EnrollStudentInputDataBuilder from '../../builders/enroll-student-input-data-builder'
import EnrollStudentOutputData from '../../../src/domain/contracts/enroll-student-output-data'
import Database from '../../helpers/database'

let enrollmentOutputData: Either<Error, EnrollStudentOutputData>

type coursesDataTable = [string, string, string, number]
type enrollmentDataTable = [string, string, string, number]
type invoicesDataTable = [number]

function isDefined (variable: unknown) {
  return typeof variable !== 'undefined' || variable !== null
}

After(async function () {
  await Database.clean()
})

Given('que a escola possua os seguintes cursos disponíveis', async function (table: DataTable) {
  const dataTable = new DataTableParser(table).parse()
  for await (const line of dataTable) {
    const [levelCode, moduleCode, classroomCode, price] = line as coursesDataTable
    const levelData = new LevelInputDataBuilder().withCode(levelCode).build()
    const moduleDataBuilder = new ModuleInputDataBuilder()
      .withCode(moduleCode)
      .withLevel(levelCode)
    if (isDefined(price)) moduleDataBuilder.withPrice(price)
    const moduleData = moduleDataBuilder.build()
    const classroomData = new ClassroomInputDataBuilder()
      .withCode(classroomCode)
      .withLevel(levelCode)
      .withModule(moduleCode)
      .build()
    await registerLevel(levelData)
    await registerModule(moduleData)
    await registerClassroom(classroomData)
  }
})

When('cadastrar a matrícula com os dados', async function (table) {
  const dataTable = new DataTableParser(table).parse()
  const [[levelCode, moduleCode, classroomCode, installments]] = dataTable as enrollmentDataTable[]
  const enrollmentDataBuilder = new EnrollStudentInputDataBuilder()
    .withLevel(levelCode)
    .withModule(moduleCode)
    .withClassroom(classroomCode)
  if (isDefined(installments)) enrollmentDataBuilder.withInstallments(installments)
  const enrollmentData = enrollmentDataBuilder.build()
  try {
    const response = await enrollStudent(enrollmentData)
    enrollmentOutputData = success(response)
  } catch (error) {
    enrollmentOutputData = fail(error as Error)
  }
})

Then('a matrícula deve ser cadastrada com sucesso', async function () {
  if (enrollmentOutputData.isFailure()) throw enrollmentOutputData.error
  const enrollment = await getEnrollment(enrollmentOutputData.value.code)
  assert.strictEqual(enrollment.code, enrollmentOutputData.value.code)
  assert.strictEqual(enrollment.status, 'active')
})

Then('a matrícula não deve ser cadastrada', async function () {
  assert(enrollmentOutputData.isFailure())
})

Then('os valores das faturas devem ser', async function (table) {
  const dataTable = new DataTableParser(table).parse()
  if (enrollmentOutputData.isFailure()) throw enrollmentOutputData.error
  const enrollment = await getEnrollment(enrollmentOutputData.value.code)
  for await (const [index, line] of dataTable.entries()) {
    const [balance] = line as invoicesDataTable
    assert.strictEqual(balance, enrollment.invoices[index].balance)
  }
})
