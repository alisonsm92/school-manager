import RegisterModuleInputData from '../contracts/register-module-input-data'
import Module from '../entities/module'
import ResourceNotFound from '../errors/resource-not-found'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'
import ModuleRepository from '../repositories/module-repository'

export default class RegisterModule {
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.levelRepository = repositoryFactory.createLevelRepository()
      this.moduleRepository = repositoryFactory.createModuleRepository()
    }

    async execute (inputData: RegisterModuleInputData): Promise<void> {
      const level = await this.levelRepository.find(inputData.level)
      if (!level) throw new ResourceNotFound('Level')
      const module = new Module(inputData)
      await this.moduleRepository.add(module)
    }
}
