import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import EnrollmentRepositoryDatabase from "../repositories/database/enrollment-repository-database";
import ClassroomRepositoryInMemorySingleton from "../repositories/memory/classroom-repository-in-memory-singleton";
import LevelRepositoryInMemorySingleton from "../repositories/memory/level-repository-in-memory-singleton";
import ModuleRepositoryInMemorySingleton from "../repositories/memory/module-repository-in-memory-singleton";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

    createEnrollmentRepository () {
        return new EnrollmentRepositoryDatabase();
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