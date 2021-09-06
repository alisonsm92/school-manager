import RepositoryAbstractFactory from "../../../app/factories/repository-abstract-factory";
import ClassRepositoryInMemory from "../../../infra/repositories/classroom-repository-in-memory";
import EnrollmentRepositoryInMemory from "../../../infra/repositories/enrollment-repository-in-memory";
import LevelRepositoryInMemory from "../../../infra/repositories/level-repository-in-memory";
import ModuleRepositoryInMemory from "../../../infra/repositories/module-repository-in-memory";
import ClassroomRepository from "../ports/classroom-repository";
import EnrollmentRepository from "../ports/enrollment-repository";
import LevelRepository from "../ports/level-repository";
import ModuleRepository from "../ports/module-repository";


export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    enrollmentRepository: EnrollmentRepository | undefined;
    levelRepository: LevelRepository | undefined;
    moduleRepository: ModuleRepository | undefined;
    classroomRepository: ClassroomRepository | undefined;

    constructor({ enrollmentRepository, levelRepository, moduleRepository, classroomRepository }: {
        enrollmentRepository?: EnrollmentRepository, 
        levelRepository?: LevelRepository,
        moduleRepository?: ModuleRepository, 
        classroomRepository?: ClassroomRepository
    }) {
        this.enrollmentRepository = enrollmentRepository,
        this.levelRepository = levelRepository,
        this.moduleRepository = moduleRepository,
        this.classroomRepository = classroomRepository
    }

    createEnrollmentRepository () {
        if(this.enrollmentRepository) return this.enrollmentRepository;
        return new EnrollmentRepositoryInMemory();
    }

    createLevelRepository () {
        if(this.levelRepository) return this.levelRepository;
        return new LevelRepositoryInMemory();
    }

    createModuleRepository () {
        if(this.moduleRepository) return this.moduleRepository;
        return new ModuleRepositoryInMemory();
    }

    createClassroomRepository () {
        if(this.classroomRepository) return this.classroomRepository;
        return new ClassRepositoryInMemory();
    }
}