import ClassRepositoryInMemory from "../../infra/repositories/classroom-repository-in-memory";
import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import LevelRepositoryInMemory from "../../infra/repositories/level-repository-in-memory";
import ModuleRepositoryInMemory from "../../infra/repositories/module-repository-in-memory";
import RepositoryAbstractFactory from "./repository-abstract-factory";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    createEnrollmentRepository () {
        return new EnrollmentRepositoryInMemory();
    }
    
    createLevelRepository () {
        return new LevelRepositoryInMemory();
    }

    createModuleRepository () {
        return new ModuleRepositoryInMemory();
    }

    createClassroomRepository () {
        return new ClassRepositoryInMemory();
    }
}