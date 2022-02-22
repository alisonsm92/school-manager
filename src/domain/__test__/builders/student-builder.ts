import Student from '../../entities/student'

export default class StudentBuilder {
  defaultData = {
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: '2002-03-12T00:00:00.000Z'
  }

  build () {
    return new Student(this.defaultData)
  }
}
