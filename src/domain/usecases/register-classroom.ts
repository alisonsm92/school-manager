import RegisterClassroomInputData from '../data/register-classroom-input-data'
import Classroom from '../entities/classroom'
import ResourceNotFound from '../errors/resource-not-found'
import RepositoryAbstractFactory from '../factories/repository-abstract-factory'
import ClassroomRepository from '../repositories/classroom-repository'
import LevelRepository from '../repositories/level-repository'
import ModuleRepository from '../repositories/module-repository'

export default class RegisterClassroom {
    private readonly classroomRepository: ClassroomRepository;
    private readonly levelRepository: LevelRepository;
    private readonly moduleRepository: ModuleRepository;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.classroomRepository = repositoryFactory.createClassroomRepository()
      this.levelRepository = repositoryFactory.createLevelRepository()
      this.moduleRepository = repositoryFactory.createModuleRepository()
    }

    async execute (inputData: RegisterClassroomInputData): Promise<void> {
      const level = await this.levelRepository.find(inputData.level)
      if (!level) throw new ResourceNotFound('Level')
      const module = await this.moduleRepository.find(inputData.level, inputData.module)
      if (!module) throw new ResourceNotFound('Module')
      const classroom = new Classroom(inputData)
      this.classroomRepository.add(classroom)
    }
}
