import Cpf from './cpf'

describe('Testing CPF', () => {
  const error = new Error('Invalid cpf')

  test('Should create a new instance of Cpf when CPF provided is valid', () => {
    expect(new Cpf('123.456.789-09')).toHaveProperty('value', '123.456.789-09')
  })

  test('Should throw an error when CPF is invalid', () => {
    expect(() => new Cpf('123.456.789-99')).toThrow(error)
  })

  test('Should throw an error when CPF contains only digits zero', () => {
    expect(() => new Cpf('000.000.000-00')).toThrow(error)
  })

  test('Should throw an error when CPF contains less than 11 digits', () => {
    expect(() => new Cpf('123.456.789-0')).toThrow(error)
  })
})
