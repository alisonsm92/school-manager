import Classroom from "../../domain/entities/classroom";
import Enrollment from "../../domain/entities/enrollment";
import EnrollmentRepository from "../../domain/use-cases/ports/enrollment-repository";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepository {
    private data: Enrollment[];

    constructor() {
        this.data = [];
    }

    findByCpf(cpf: string) {
        return this.data.find(enrollment => enrollment.student.cpf === cpf);
    }

    findAllByClass({ module, level, code }: Classroom) {
        return this.data.filter(enrollment => enrollment.module.code === module
            && enrollment.level.code === level
            && enrollment.classroom.code === code);
    }

    count(): number {
        return this.data.length;
    }

    add(enrollment: Enrollment) {
        this.data.push(enrollment)
    }
}