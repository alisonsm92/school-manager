import assert from 'assert'
import { Given, When, Then, DataTable, After } from '@cucumber/cucumber'
import {
  registerModule,
  registerLevel,
  registerClassroom,
  enrollStudent,
  getEnrollment
} from '../infra/service-api'
import DataTableParser from '../helpers/datatable-parser'
import LevelInputDataBuilder from '../builders/level-input-data-builder'
import ModuleInputDataBuilder from '../builders/module-input-data-builder'
import ClassroomInputDataBuilder from '../builders/classroom-input-data-builder'
import EnrollStudentInputDataBuilder from '../builders/enroll-student-input-data-builder'
import Database from '../helpers/database'

After(async function () {
  await Database.clean()
})

Given('que a escola possua os seguintes cursos disponíveis', async function (table: DataTable) {
  const dataTableParser = new DataTableParser(table)
  const dataTable = dataTableParser.parse()
  for await (const line of dataTable) {
    const [levelCode, moduleCode, classroomCode] = line
    this.levelData = new LevelInputDataBuilder().withCode(levelCode).build()
    this.moduleData = new ModuleInputDataBuilder().withCode(moduleCode).withLevel(levelCode).build()
    this.classroomData = new ClassroomInputDataBuilder()
      .withCode(classroomCode)
      .withLevel(levelCode)
      .withModule(moduleCode)
      .build()
    await registerLevel(this.levelData)
    await registerModule(this.moduleData)
    await registerClassroom(this.classroomData)
  }
})

When('cadastrar a matrícula com os dados', async function (table) {
  const dataTableParser = new DataTableParser(table)
  const [[levelCode, moduleCode, classroomCode]] = dataTableParser.parse()
  this.enrollmentData = new EnrollStudentInputDataBuilder()
    .withLevel(levelCode)
    .withModule(moduleCode)
    .withClassroom(classroomCode)
    .build()
  this.enrollment = await enrollStudent(this.enrollmentData)
})

Then('a matrícula deve ser cadastrada com sucesso', async function () {
  const enrollment = await getEnrollment(this.enrollment)
  assert(enrollment.code = this.enrollment.code)
  assert(enrollment.status = 'active')
})
