
import ModuleRepository from '../../../../domain/repositories/module-repository'
import ModuleRepositoryMemory from './module-repository-memory'

export default class ModuleRepositoryMemorySingleton {
    static instance: ModuleRepository | undefined;

    static getInstance (): ModuleRepository {
      if (!ModuleRepositoryMemorySingleton.instance) {
        ModuleRepositoryMemorySingleton.instance = new ModuleRepositoryMemory()
      }
      return ModuleRepositoryMemorySingleton.instance
    }

    static destroy () {
      ModuleRepositoryMemorySingleton.instance = undefined
    }
}
