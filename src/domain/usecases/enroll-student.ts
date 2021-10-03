import Enrollment from '../entities/enrollment';
import Student from '../entities/student';
import InvalidCpfError from '../errors/invalid-cpf';
import InvalidNameError from '../errors/invalid-name';
import EnrollStudentInputData from '../ports/enroll-student-input-data';
import LevelRepository from '../repositories/level-repository';
import EnrollStudentOutputData from '../ports/enroll-student-output-data';
import RepositoryAbstractFactory from '../factories/repository-abstract-factory';
import ClassroomRepository from '../repositories/classroom-repository';
import EnrollmentRepository from '../repositories/enrollment-repository';
import ModuleRepository from '../repositories/module-repository';

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

    execute(inputData: EnrollStudentInputData): EnrollStudentOutputData {
        try {
            const student = new Student({
                name: inputData.student.name, 
                cpf: inputData.student.cpf,
                birthDate: inputData.student.birthDate
            });
            const level = this.levelRepository.findByCode(inputData.level);
            if(!level) throw new Error('Level not found');
            const module = this.moduleRepository.find(inputData.level, inputData.module);
            if(!module) throw new Error('Module not found');
            const classroom = this.classroomRepository.find(
                inputData.level, inputData.module, inputData.classroom
            );
            if(!classroom) throw new Error('Class not found');
            const studentsEnrolled = this.enrollmentRepository.findAllByClass(classroom);
            if(classroom.capacity === studentsEnrolled.length) throw new Error('Class is over capacity');
            if(this.enrollmentRepository.findByCpf(inputData.student.cpf)) {
                throw new Error('Enrollment with duplicated student is not allowed');
            }
            const sequence = this.enrollmentRepository.count() + 1;
            const issueDate = new Date();
            const { installments } = inputData;
            const enrollment = new Enrollment({ 
                student, level, module, classroom, issueDate, sequence, installments  
            });
            this.enrollmentRepository.add(enrollment);
            return new EnrollStudentOutputData(enrollment);
        } catch (error) {
            if(error instanceof InvalidCpfError) throw new Error('Invalid student cpf');
            if(error instanceof InvalidNameError) throw new Error('Invalid student name');
            throw error;
        };
    }
}