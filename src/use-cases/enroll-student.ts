import Enrollment from "../core/entities/enrollment";
import EnrollmentRequest from "./ports/enrollment-request";
import InvalidCpfError from "../core/errors/invalid-cpf";
import InvalidNameError from "../core/errors/invalid-name";
import ModuleRepository from "../adapters/output/repositories/module-repository";

const byCpf = (cpf: string) => (enrollment: Enrollment) => enrollment.student.cpf === cpf;

export default class EnrollStudent {
    private enrollments: Enrollment[];
    private readonly moduleRepository: ModuleRepository;

    constructor(moduleRepository: ModuleRepository) {
        this.moduleRepository = moduleRepository;
        this.enrollments = [];
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        try {
            if(this.enrollments.find(byCpf(enrollmentRequest.student.cpf))) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const enrollment = new Enrollment(enrollmentRequest, this.enrollments.length);
            const module = this.moduleRepository.find(enrollment.level, enrollment.module);
            if(!module) {
                throw new Error('Module not found');
            }
            if(enrollment.student.age < module.minimumAge) {
                throw new Error('Student below minimum age');
            }
            this.enrollments.push(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}