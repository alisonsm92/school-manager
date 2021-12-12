
import EnrollmentRepository from '../../../../domain/repositories/enrollment-repository'
import EnrollmentRepositoryMemory from './enrollment-repository-memory'

export default class EnrollmentRepositoryMemorySingleton {
    static instance: EnrollmentRepository | undefined;

    static getInstance (): EnrollmentRepository {
      if (!EnrollmentRepositoryMemorySingleton.instance) {
        EnrollmentRepositoryMemorySingleton.instance = new EnrollmentRepositoryMemory()
      }
      return EnrollmentRepositoryMemorySingleton.instance
    }

    static destroy () {
      EnrollmentRepositoryMemorySingleton.instance = undefined
    }
}
