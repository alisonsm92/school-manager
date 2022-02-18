import RegisterLevelInputData from '../data/register-level-input-data'
import Level from '../entities/level'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'

export default class RegisterLevel {
    private readonly levelRepository: LevelRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.levelRepository = repositoryFactory.createLevelRepository()
    }

    async execute (inputData: RegisterLevelInputData): Promise<void> {
      const level = new Level(inputData)
      this.levelRepository.add(level)
    }
}
