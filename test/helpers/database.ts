import ClassroomRepositoryDatabase from '../../src/adapter/output/repositories/database/classroom-repository-database'
import EnrollmentRepositoryDatabase from '../../src/adapter/output/repositories/database/enrollment-repository-database'
import LevelRepositoryDatabase from '../../src/adapter/output/repositories/database/level-repository-database'
import ModuleRepositoryDatabase from '../../src/adapter/output/repositories/database/module-repository-database'
import ConnectionPool from '../../src/infra/database/postgresql'
const connectionPool = new ConnectionPool()

export default class Database {
  static async clean () {
    const EnrollmentRepository = new EnrollmentRepositoryDatabase(connectionPool)
    const levelRepository = new LevelRepositoryDatabase(connectionPool)
    const moduleRepository = new ModuleRepositoryDatabase(connectionPool)
    const classroomRepository = new ClassroomRepositoryDatabase(connectionPool)
    await Promise.all([
      EnrollmentRepository.clean(),
      levelRepository.clean(),
      moduleRepository.clean(),
      classroomRepository.clean()
    ])
  }
}
