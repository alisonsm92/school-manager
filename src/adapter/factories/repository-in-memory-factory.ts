import ClassroomRepositoryInMemorySingleton from "../repositories/classroom-repository-in-memory-singleton";
import EnrollmentRepositoryInMemorySingleton from "../repositories/enrollment-repository-in-memory-singleton";
import LevelRepositoryInMemorySingleton from "../repositories/level-repository-in-memory-singleton";
import ModuleRepositoryInMemorySingleton from "../repositories/module-repository-in-memory-singleton";
import RepositoryAbstractFactory from "../../domain/factories/repository-abstract-factory";

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