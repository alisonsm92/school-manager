import Classroom from "../entities/classroom";
import Enrollment from "../entities/enrollment";
import EnrollmentCode from "../entities/enrollment-code";
interface EnrollmentRepository {
    findByCode(code: EnrollmentCode['value']): Enrollment|undefined
    findByCpf(cpf: string): Enrollment|undefined
    findAllByClass(classroom: Classroom): Enrollment[]
    count(): number
    add(enrollment: Enrollment): void
    update(enrollment: Enrollment): void
}

export default EnrollmentRepository;