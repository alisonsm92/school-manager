import Module from "../../core/entities/module";

interface ModuleRepository {
    find(level: string, code: string): Module|undefined
    add(module: Module): void
}

export default ModuleRepository;