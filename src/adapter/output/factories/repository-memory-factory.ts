import ClassroomRepositoryMemorySingleton from "../repositories/memory/classroom-repository-memory-singleton";
import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import EnrollmentRepositoryMemorySingleton from "../repositories/memory/enrollment-repository-memory-singleton";
import LevelRepositoryMemorySingleton from "../repositories/memory/level-repository-memory-singleton";
import ModuleRepositoryMemorySingleton from "../repositories/memory/module-repository-memory-singleton";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    constructor () {
        EnrollmentRepositoryMemorySingleton.destroy();
        LevelRepositoryMemorySingleton.destroy();
        ModuleRepositoryMemorySingleton.destroy();
        ClassroomRepositoryMemorySingleton.destroy();
    }

    createEnrollmentRepository () {
        return EnrollmentRepositoryMemorySingleton.getInstance();
    }
    
    createLevelRepository () {
        return LevelRepositoryMemorySingleton.getInstance();
    }

    createModuleRepository () {
        return ModuleRepositoryMemorySingleton.getInstance();
    }

    createClassroomRepository () {
        return ClassroomRepositoryMemorySingleton.getInstance();
    }
}