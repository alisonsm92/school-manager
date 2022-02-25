export default class EnrollStudentInputData {
    readonly student: {
        name: string;
        cpf: string;
        birthDate: string;
    };

    readonly level: string;
    readonly module: string;
    readonly classroom: string;
    readonly installments: number;

    constructor (inputData: {
        student: {
            name: string,
            cpf: string,
            birthDate: string
        },
        level: string,
        module: string,
        classroom: string,
        installments: number
    }) {
      this.student = {
        name: inputData.student.name,
        cpf: inputData.student.cpf,
        birthDate: inputData.student.birthDate
      }
      this.level = inputData.level
      this.module = inputData.module
      this.classroom = inputData.classroom
      this.installments = inputData.installments
    }
}
