import Classroom from "../../entities/classroom";
import Enrollment from "../../entities/enrollment";

interface EnrollmentRepository {
    findByCpf(cpf: string): Enrollment|undefined
    findAllByClass(classroom: Classroom): Enrollment[]
    count(): number
    add(enrollment: Enrollment): void
}

export default EnrollmentRepository;