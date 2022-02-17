import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'
import { addModule } from '../../infra/module.mjs'

Given('que a escola possua os seguintes cursos disponíveis', async function (table) {
  const [level, code] = table.rows()
  await addModule({ level, code })
})

When('cadastrar a matrícula com os dados', function () {
  return 'pending'
})

Then('a matrícula deve ser cadastrada com sucesso', function () {
  assert(1, 1)
  return 'pending'
})
