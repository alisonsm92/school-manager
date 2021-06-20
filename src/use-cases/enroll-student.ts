import Enrollment from '../core/entities/enrollment';
import EnrollmentRequest from './ports/enrollment-request';
import InvalidCpfError from '../core/errors/invalid-cpf';
import InvalidNameError from '../core/errors/invalid-name';
import EnrollmentRepositoryInMemory from '../adapters/output/repositories/enrollment-repository-in-memory';
import LevelRepositoryInMemory from '../adapters/output/repositories/level-repository-in-memory';
import ModuleRepositoryInMemory from '../adapters/output/repositories/module-repository-in-memory';
import ClassRepositoryInMemory from '../adapters/output/repositories/class-repository-in-memory';

type Dependencies = {
    enrollmentRepository: EnrollmentRepositoryInMemory,
    levelRepository: LevelRepositoryInMemory, 
    moduleRepository: ModuleRepositoryInMemory, 
    classRepository: ClassRepositoryInMemory
}
export default class EnrollStudent {
    private readonly enrollmentRepository: EnrollmentRepositoryInMemory;
    private readonly levelRepository: LevelRepositoryInMemory;
    private readonly moduleRepository: ModuleRepositoryInMemory;
    private readonly classRepository: ClassRepositoryInMemory;

    constructor(dependencies: Dependencies) {
        this.enrollmentRepository = dependencies.enrollmentRepository;
        this.levelRepository = dependencies.levelRepository;
        this.moduleRepository = dependencies.moduleRepository;
        this.classRepository = dependencies.classRepository;
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        try {
            if(this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const enrollment = new Enrollment(enrollmentRequest, this.enrollmentRepository.count());
            const level = this.levelRepository.findByCode(enrollment.level);
            if(!level) {
                throw new Error('Level not found');
            }
            const module = this.moduleRepository.find(enrollment.level, enrollment.module);
            if(!module) {
                throw new Error('Module not found');
            }
            if(enrollment.student.age < module.minimumAge) {
                throw new Error('Student below minimum age');
            }
            const classRoom = this.classRepository.find(
                enrollment.level, enrollment.module, enrollment.classRoom
            );
            if(!classRoom) {
                throw new Error('Class not found');
            }
            if(classRoom.capacity === this.enrollmentRepository.findAllByClass(classRoom).length) {
                throw new Error('Class is over capacity');
            }
            this.enrollmentRepository.add(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}