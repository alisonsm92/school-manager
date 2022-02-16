import EnrollModuleInputData from '../data/enroll-module-input-data'
import Module from '../entities/module'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'
import ModuleRepository from '../repositories/module-repository'

export default class EnrollModule {
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.levelRepository = repositoryFactory.createLevelRepository()
      this.moduleRepository = repositoryFactory.createModuleRepository()
    }

    async execute (inputData: EnrollModuleInputData): Promise<void> {
      const level = await this.levelRepository.find(inputData.level)
      if (!level) throw new Error('Level not found')
      const module = new Module(inputData)
      this.moduleRepository.add(module)
    }
}
