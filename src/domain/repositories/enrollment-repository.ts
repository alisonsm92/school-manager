import Classroom from "../entities/classroom";
import Enrollment from "../entities/enrollment";
interface EnrollmentRepository {
    findByCode(code: string): Promise<Enrollment|undefined>
    findByCpf(cpf: string): Promise<Enrollment|undefined>
    findAllByClass(classroom: Classroom): Promise<Enrollment[]>
    count(): Promise<number>
    add(enrollment: Enrollment): Promise<void>
    update(enrollment: Enrollment): Promise<void>
    clean(): Promise<void>
}

export default EnrollmentRepository;