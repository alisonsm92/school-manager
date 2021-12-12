import ClassroomRepository from '../repositories/classroom-repository'
import EnrollmentRepository from '../repositories/enrollment-repository'
import LevelRepository from '../repositories/level-repository'
import ModuleRepository from '../repositories/module-repository'

export default interface RepositoryAbstractFactory {
    createEnrollmentRepository (): EnrollmentRepository;
    createLevelRepository (): LevelRepository;
    createModuleRepository (): ModuleRepository;
    createClassroomRepository (): ClassroomRepository;
}
