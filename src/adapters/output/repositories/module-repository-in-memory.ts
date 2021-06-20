import Module from '../../../core/entities/module';
import ModuleRepository from '../../../use-cases/ports/module-repository';

export default class ModuleRepositoryInMemory implements ModuleRepository {
    readonly data: Module[] = [];

    find(level: string, code: string) {
        return this.data.find(module => module.level === level && module.code === code);
    }

    add(module: Module): void {
        this.data.push(module);
    }
}