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
import Database from '../../helpers/database'
import GetEnrollmentOutputData from '../../../src/domain/data/get-enrollment-output-data'

let enrollmentOutputData: Either<Error, GetEnrollmentOutputData>

After(async function () {
  await Database.clean()
})

Given('que a escola possua os seguintes cursos disponíveis', async function (table: DataTable) {
  const dataTable = new DataTableParser(table).parse()
  for await (const line of dataTable) {
    const [levelCode, moduleCode, classroomCode] = line
    const levelData = new LevelInputDataBuilder().withCode(levelCode).build()
    const moduleData = new ModuleInputDataBuilder().withCode(moduleCode).withLevel(levelCode).build()
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
  const [[levelCode, moduleCode, classroomCode]] = new DataTableParser(table).parse()
  const enrollmentData = new EnrollStudentInputDataBuilder()
    .withLevel(levelCode)
    .withModule(moduleCode)
    .withClassroom(classroomCode)
    .build()
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
