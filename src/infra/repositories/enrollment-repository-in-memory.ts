import Classroom from "../../domain/entities/classroom";
import Enrollment from "../../domain/entities/enrollment";
import EnrollmentCode from "../../domain/entities/enrollment-code";
import EnrollmentRepository from "../../domain/use-cases/ports/enrollment-repository";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepository {
    private data: Enrollment[];

    constructor() {
        this.data = [];
    }

    findByCode(code: EnrollmentCode['value']) {
        return this.data.find(enrollment => enrollment.code.value === code);
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

    update(enrollment: Enrollment) {
        const index = this.data.findIndex(item => item.code.value === enrollment.code.value);
        this.data[index] = enrollment;
    }
}