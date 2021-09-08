import ClassroomRepositoryInMemorySingleton from "../../infra/repositories/classroom-repository-in-memory-singleton";
import EnrollmentRepositoryInMemorySingleton from "../../infra/repositories/enrollment-repository-in-memory-singleton";
import LevelRepositoryInMemorySingleton from "../../infra/repositories/level-repository-in-memory-singleton";
import ModuleRepositoryInMemorySingleton from "../../infra/repositories/module-repository-in-memory-singleton";
import RepositoryAbstractFactory from "./repository-abstract-factory";

export default class RepositoryInMemoryFactory implements RepositoryAbstractFactory {
    constructor () {
        EnrollmentRepositoryInMemorySingleton.destroy();
        LevelRepositoryInMemorySingleton.destroy();
        ModuleRepositoryInMemorySingleton.destroy();
        ClassroomRepositoryInMemorySingleton.destroy();
    }

    createEnrollmentRepository () {
        return EnrollmentRepositoryInMemorySingleton.getInstance();
    }
    
    createLevelRepository () {
        return LevelRepositoryInMemorySingleton.getInstance();
    }

    createModuleRepository () {
        return ModuleRepositoryInMemorySingleton.getInstance();
    }

    createClassroomRepository () {
        return ClassroomRepositoryInMemorySingleton.getInstance();
    }
}