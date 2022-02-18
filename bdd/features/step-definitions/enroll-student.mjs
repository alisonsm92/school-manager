import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'
import {
  registerModule,
  registerLevel,
  registerClassroom,
  enrollStudent,
  getEnrollment
} from '../../infra/service-api.mjs'
import DataTableParser from '../../helpers/datatable-parser.mjs'

Given('que a escola possua os seguintes cursos disponíveis', async function (table) {
  const dataTableParser = new DataTableParser(table)
  const dataTable = dataTableParser.parse()
  for await (const line of dataTable) {
    const [levelCode, moduleCode, classroomCode] = line
    this.level = await registerLevel({ code: levelCode })
    this.module = await registerModule({ level: this.level.code, code: moduleCode })
    this.classroom = await registerClassroom(
      { level: this.level.code, module: this.module.code, code: classroomCode })
  }
})

When('cadastrar a matrícula com os dados', async function (table) {
  const dataTableParser = new DataTableParser(table)
  const [[level, module, classroom]] = dataTableParser.parse()
  this.enrollment = await enrollStudent({ level, module, classroom })
})

Then('a matrícula deve ser cadastrada com sucesso', async function () {
  const enrollment = await getEnrollment(this.enrollment)
  assert(enrollment.code = this.enrollment.code)
  assert(enrollment.status = 'active')
})
