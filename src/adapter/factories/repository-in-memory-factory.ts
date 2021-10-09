import ClassroomRepositoryInMemorySingleton from "../repositories/in-memory/classroom-repository-in-memory-singleton";
import RepositoryAbstractFactory from "../../domain/factories/repository-abstract-factory";
import EnrollmentRepositoryInMemorySingleton from "../repositories/in-memory/enrollment-repository-in-memory-singleton";
import LevelRepositoryInMemorySingleton from "../repositories/in-memory/level-repository-in-memory-singleton";
import ModuleRepositoryInMemorySingleton from "../repositories/in-memory/module-repository-in-memory-singleton";

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