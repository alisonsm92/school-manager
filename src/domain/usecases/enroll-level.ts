import EnrollLevelInputData from '../data/enroll-level-input-data'
import Level from '../entities/level'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import LevelRepository from '../repositories/level-repository'

export default class EnrollLevel {
    private readonly levelRepository: LevelRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.levelRepository = repositoryFactory.createLevelRepository()
    }

    async execute (inputData: EnrollLevelInputData): Promise<void> {
      const level = new Level(inputData)
      this.levelRepository.add(level)
    }
}
