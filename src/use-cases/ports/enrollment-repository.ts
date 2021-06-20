import Class from "../../core/entities/class";
import Enrollment from "../../core/entities/enrollment";

interface EnrollmentRepository {
    findByCpf(cpf: string): Enrollment|undefined
    findAllByClass(classRoom: Class): Enrollment[]
    count(): number
    add(enrollment: Enrollment): void
}

export default EnrollmentRepository;