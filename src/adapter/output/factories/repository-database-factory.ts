import ConnectionPool from '../../../domain/entities/connection-pool'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import ClassroomRepositoryDatabase from '../repositories/database/classroom-repository-database'
import EnrollmentRepositoryDatabase from '../repositories/database/enrollment-repository-database'
import LevelRepositoryDatabase from '../repositories/database/level-repository-database'
import ModuleRepositoryDatabase from '../repositories/database/module-repository-database'

export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {
  private readonly connectionPool: ConnectionPool

  constructor (connectionPool: ConnectionPool) {
    this.connectionPool = connectionPool
  }

  createEnrollmentRepository () {
    return new EnrollmentRepositoryDatabase(this.connectionPool)
  }

  createLevelRepository () {
    return new LevelRepositoryDatabase(this.connectionPool)
  }

  createModuleRepository () {
    return new ModuleRepositoryDatabase(this.connectionPool)
  }

  createClassroomRepository () {
    return new ClassroomRepositoryDatabase(this.connectionPool)
  }
}
