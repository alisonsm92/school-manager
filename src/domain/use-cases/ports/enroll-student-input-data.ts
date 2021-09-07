interface EnrollStudentInputData {
    student: {
        name: string,
        cpf: string,
        birthDate: Date
    },
    level: string,
    module: string,
    classroom: string,
    installments: number
}

export default EnrollStudentInputData;