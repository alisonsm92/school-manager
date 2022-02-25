import Enrollment from '../entities/enrollment'
import Student from '../entities/student'
import InvalidCpfError from '../errors/invalid-cpf'
import InvalidNameError from '../errors/invalid-name'
import EnrollStudentInputData from '../contracts/enroll-student-input-data'
import LevelRepository from '../repositories/level-repository'
import EnrollStudentOutputData from '../contracts/enroll-student-output-data'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import ClassroomRepository from '../repositories/classroom-repository'
import EnrollmentRepository from '../repositories/enrollment-repository'
import ModuleRepository from '../repositories/module-repository'
import ResourceNotFound from '../errors/resource-not-found'
import InvalidInputError from '../errors/invalid-input'

export default class EnrollStudent {
    private readonly enrollmentRepository: EnrollmentRepository;
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;
    private readonly classroomRepository: ClassroomRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.enrollmentRepository = repositoryFactory.createEnrollmentRepository()
      this.levelRepository = repositoryFactory.createLevelRepository()
      this.moduleRepository = repositoryFactory.createModuleRepository()
      this.classroomRepository = repositoryFactory.createClassroomRepository()
    }

    async execute (inputData: EnrollStudentInputData): Promise<EnrollStudentOutputData> {
      try {
        const student = new Student({
          name: inputData.student.name,
          cpf: inputData.student.cpf,
          birthDate: inputData.student.birthDate
        })
        const level = await this.levelRepository.find(inputData.level)
        if (!level) throw new ResourceNotFound('Level')
        const module = await this.moduleRepository.find(inputData.level, inputData.module)
        if (!module) throw new ResourceNotFound('Module')
        const classroom = await this.classroomRepository.find(
          inputData.level, inputData.module, inputData.classroom
        )
        if (!classroom) throw new ResourceNotFound('Classroom')
        const studentsEnrolled = await this.enrollmentRepository.findAllByClass(classroom)
        if (classroom.capacity === studentsEnrolled.length) {
          throw new InvalidInputError('Class is over capacity')
        }
        if (await this.enrollmentRepository.findByCpf(inputData.student.cpf)) {
          throw new InvalidInputError('Enrollment with duplicated student is not allowed')
        }
        const sequence = await this.enrollmentRepository.count() + 1
        const issueDate = new Date()
        const { installments } = inputData
        const enrollment = new Enrollment({
          student, level, module, classroom, issueDate, sequence, installments
        })
        await this.enrollmentRepository.add(enrollment)
        return new EnrollStudentOutputData(enrollment)
      } catch (error) {
        if (error instanceof InvalidCpfError) throw new InvalidInputError('Invalid student cpf')
        if (error instanceof InvalidNameError) throw new InvalidInputError('Invalid student name')
        throw error
      }
    }
}
