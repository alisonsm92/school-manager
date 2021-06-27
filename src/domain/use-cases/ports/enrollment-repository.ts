import ClassRoom from "../../entities/class-room";
import Enrollment from "../../entities/enrollment";

interface EnrollmentRepository {
    findByCpf(cpf: string): Enrollment|undefined
    findAllByClass(classRoom: ClassRoom): Enrollment[]
    count(): number
    add(enrollment: Enrollment): void
}

export default EnrollmentRepository;