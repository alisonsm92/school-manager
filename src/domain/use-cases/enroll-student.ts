import Enrollment from '../entities/enrollment';
import EnrollStudentRequestData from './ports/enroll-student-request-data';
import InvalidCpfError from '../errors/invalid-cpf';
import InvalidNameError from '../errors/invalid-name';
import ClassroomRepository from './ports/classroom-repository';
import ModuleRepository from './ports/module-repository';
import LevelRepository from './ports/level-repository';
import EnrollmentRepository from './ports/enrollment-repository';
import Student from '../entities/student';
import RepositoryAbstractFactory from '../../app/factories/repository-abstract-factory';

export default class EnrollStudent {
    private readonly enrollmentRepository: EnrollmentRepository;
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;
    private readonly classroomRepository: ClassroomRepository;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
        this.levelRepository = repositoryFactory.createLevelRepository();
        this.moduleRepository = repositoryFactory.createModuleRepository();
        this.classroomRepository = repositoryFactory.createClassroomRepository();
    }

    execute(enrollmentRequest: EnrollStudentRequestData): Enrollment {
        try {
            const student = new Student({
                name: enrollmentRequest.student.name, 
                cpf: enrollmentRequest.student.cpf,
                birthDate: enrollmentRequest.student.birthDate
            });
            const level = this.levelRepository.findByCode(enrollmentRequest.level);
            if(!level) {
                throw new Error('Level not found');
            }
            const module = this.moduleRepository.find(enrollmentRequest.level, enrollmentRequest.module);
            if(!module) {
                throw new Error('Module not found');
            }
            const classroom = this.classroomRepository.find(
                enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.classroom
            );
            if(!classroom) {
                throw new Error('Class not found');
            }
            const studentsEnrolledInClassroom = this.enrollmentRepository.findAllByClass(classroom);
            if(classroom.capacity === studentsEnrolledInClassroom.length) {
                throw new Error('Class is over capacity');
            }
            if(this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const sequence = this.enrollmentRepository.count() + 1;
            const issueDate = new Date();
            const { installments } = enrollmentRequest;
            const enrollment = new Enrollment({ 
                student, level, module, classroom, issueDate, sequence, installments  
            });
            this.enrollmentRepository.add(enrollment);
            return enrollment;
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}