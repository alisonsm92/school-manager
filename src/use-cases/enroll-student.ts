import Enrollment from '../core/entities/enrollment';
import EnrollmentRequest from './ports/enrollment-request';
import InvalidCpfError from '../core/errors/invalid-cpf';
import InvalidNameError from '../core/errors/invalid-name';
import ClassRepository from './ports/class-repository';
import ModuleRepository from './ports/module-repository';
import LevelRepository from './ports/level-repository';
import EnrollmentRepository from './ports/enrollment-repository';
import Student from '../core/entities/student';

type Dependencies = {
    enrollmentRepository: EnrollmentRepository,
    levelRepository: LevelRepository, 
    moduleRepository: ModuleRepository, 
    classRepository: ClassRepository
}
export default class EnrollStudent {
    private readonly enrollmentRepository: EnrollmentRepository;
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;
    private readonly classRepository: ClassRepository;

    constructor(dependencies: Dependencies) {
        this.enrollmentRepository = dependencies.enrollmentRepository;
        this.levelRepository = dependencies.levelRepository;
        this.moduleRepository = dependencies.moduleRepository;
        this.classRepository = dependencies.classRepository;
    }

    execute(enrollmentRequest: EnrollmentRequest): Enrollment {
        try {
            const student = new Student(
                enrollmentRequest.student.name, 
                enrollmentRequest.student.cpf,
                enrollmentRequest.student.birthDate
            );
            const level = this.levelRepository.findByCode(enrollmentRequest.level);
            if(!level) {
                throw new Error('Level not found');
            }
            const module = this.moduleRepository.find(enrollmentRequest.level, enrollmentRequest.module);
            if(!module) {
                throw new Error('Module not found');
            }
            if(student.age < module.minimumAge) {
                throw new Error('Student below minimum age');
            }
            const classRoom = this.classRepository.find(
                enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.classRoom
            );
            if(!classRoom) {
                throw new Error('Class not found');
            }
            if(classRoom.capacity === this.enrollmentRepository.findAllByClass(classRoom).length) {
                throw new Error('Class is over capacity');
            }
            if(this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const sequence = this.enrollmentRepository.count();
            const enrollment = new Enrollment(student, enrollmentRequest, sequence);
            this.enrollmentRepository.add(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}