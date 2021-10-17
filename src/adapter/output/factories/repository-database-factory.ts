import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import ClassroomRepositoryDatabase from "../repositories/database/classroom-repository-database";
import EnrollmentRepositoryDatabase from "../repositories/database/enrollment-repository-database";
import LevelRepositoryDatabase from "../repositories/database/level-repository-database";
import ModuleRepositoryDatabase from "../repositories/database/module-repository-database";

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {

    createEnrollmentRepository () {
        return new EnrollmentRepositoryDatabase();
    }
    
    createLevelRepository () {
        return new LevelRepositoryDatabase();
    }

    createModuleRepository () {
        return new ModuleRepositoryDatabase();
    }

    createClassroomRepository () {
        return new ClassroomRepositoryDatabase();
    }
}