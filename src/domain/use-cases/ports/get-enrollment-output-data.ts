import { EnrollmentStatus } from "../../entities/enrollment";

interface GetEnrollmentOutputData {
    code: string,
    student: {
        name: string,
        cpf: string,
        birthDate: Date
    },
    balance: number,
    status: EnrollmentStatus
}

export default GetEnrollmentOutputData;