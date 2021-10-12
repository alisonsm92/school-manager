import Classroom from "../../../../domain/entities/classroom";
import Enrollment from "../../../../domain/entities/enrollment";
import EnrollmentCode from "../../../../domain/entities/enrollment-code";
import EnrollmentRepository from "../../../../domain/repositories/enrollment-repository";

export default class EnrollmentRepositoryInMemory implements EnrollmentRepository {
    private data: Enrollment[];

    constructor() {
        this.data = [];
    }

    async findByCode(code: EnrollmentCode['value']) {
        return this.data.find(enrollment => enrollment.code.value === code);
    }

    async findByCpf(cpf: string) {
        return this.data.find(enrollment => enrollment.student.cpf === cpf);
    }

    async findAllByClass({ module, level, code }: Classroom) {
        return this.data.filter(enrollment => enrollment.module.code === module
            && enrollment.level.code === level
            && enrollment.classroom.code === code);
    }

    async count() {
        return this.data.length;
    }

    async add(enrollment: Enrollment) {
        this.data.push(enrollment)
    }

    async update(enrollment: Enrollment) {
        const index = this.data.findIndex(item => item.code.value === enrollment.code.value);
        this.data[index] = enrollment;
    }

    async clean() {
        this.data = [];
    }
}