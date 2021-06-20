import Class from "../../../core/entities/class";
import Enrollment from "../../../core/entities/enrollment";
import EnrollmentRepository from "../../../use-cases/ports/enrollment-repository";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepository {
    private data: Enrollment[];

    constructor() {
        this.data = [];
    }

    findByCpf(cpf: string) {
        return this.data.find(enrollment => enrollment.student.cpf === cpf);
    }

    findAllByClass({ module, level, code }: Class) {
        return this.data.filter(enrollment => enrollment.module === module
            && enrollment.level === level
            && enrollment.classRoom === code);
    }

    count(): number {
        return this.data.length;
    }

    add(enrollment: Enrollment) {
        this.data.push(enrollment)
    }
}