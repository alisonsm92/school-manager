interface EnrollmentRequest {
    student: {
        name: string,
        cpf: string,
        birthDate: Date
    },
    level: string,
    module: string,
    classroom: string
}

export default EnrollmentRequest