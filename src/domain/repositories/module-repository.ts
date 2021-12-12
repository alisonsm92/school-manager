import Module from '../entities/module'

interface ModuleRepository {
    find(level: string, code: string): Promise<Module|undefined>
    add(module: Module): Promise<void>
    clean(): Promise<void>
}

export default ModuleRepository
