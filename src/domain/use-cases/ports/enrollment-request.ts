interface EnrollmentRequest {
    student: {
        name: string,
        cpf: string,
        birthDate: string
    },
    level: string,
    module: string,
    classroom: string
}

export default EnrollmentRequest