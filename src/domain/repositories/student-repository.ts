import Cpf from "../entities/cpf";
import Student from "../entities/student";

interface StudentRepository {
    find(cpf: Cpf): Promise<Student|undefined>
    add(student: Student): Promise<void>
    clean(): Promise<void>
}

export default StudentRepository;