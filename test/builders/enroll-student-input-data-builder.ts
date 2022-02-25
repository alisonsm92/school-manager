export default class EnrollmentBuilder {
  defaultData = {
    student: {
      name: 'Maria Carolina Fonseca',
      cpf: '755.525.774-26',
      birthDate: '2002-03-12T00:00:00.000Z'
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
    issueDate: new Date(),
    sequence: 0,
    installments: 12
  }

  withLevel (value: string) {
    this.defaultData.level = value
    return this
  }

  withModule (value: string) {
    this.defaultData.module = value
    return this
  }

  withClassroom (value: string) {
    this.defaultData.classroom = value
    return this
  }

  withInstallments (value: number) {
    this.defaultData.installments = value
    return this
  }

  build () {
    return this.defaultData
  }
}
