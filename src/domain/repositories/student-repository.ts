import Student from "../entities/student";

interface StudentRepository {
    find(cpf: string): Promise<Student|undefined>
    add(student: Student): Promise<void>
    update(student: Student): Promise<void>
    clean(): Promise<void>
}

export default StudentRepository;