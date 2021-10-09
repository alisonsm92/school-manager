import Classroom from "../entities/classroom";
import Enrollment from "../entities/enrollment";
import EnrollmentCode from "../entities/enrollment-code";
interface EnrollmentRepository {
    findByCode(code: EnrollmentCode['value']): Promise<Enrollment|undefined>
    findByCpf(cpf: string): Promise<Enrollment|undefined>
    findAllByClass(classroom: Classroom): Promise<Enrollment[]>
    count(): Promise<number>
    add(enrollment: Enrollment): Promise<void>
    update(enrollment: Enrollment): Promise<void>
}

export default EnrollmentRepository;