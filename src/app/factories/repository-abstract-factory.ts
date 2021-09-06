import ClassroomRepository from "../../domain/use-cases/ports/classroom-repository";
import EnrollmentRepository from "../../domain/use-cases/ports/enrollment-repository";
import LevelRepository from "../../domain/use-cases/ports/level-repository";
import ModuleRepository from "../../domain/use-cases/ports/module-repository";

export default interface RepositoryAbstractFactory {
    createEnrollmentRepository (): EnrollmentRepository;
    createLevelRepository (): LevelRepository;
    createModuleRepository (): ModuleRepository;
    createClassroomRepository (): ClassroomRepository;
}