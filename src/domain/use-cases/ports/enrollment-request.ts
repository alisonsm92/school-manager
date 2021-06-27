interface EnrollmentRequest {
    student: {
        name: string,
        cpf: string,
        birthDate: string
    },
    level: string,
    module: string,
    classRoom: string
}

export default EnrollmentRequest