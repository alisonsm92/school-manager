import Module from '../../../../domain/entities/module';
import ModuleRepository from '../../../../domain/repositories/module-repository';

export default class ModuleRepositoryInMemory implements ModuleRepository {
    private data: Module[];

    constructor() {
        this.data = [];
    }

    async find(level: string, code: string) {
        return this.data.find(module => module.level === level && module.code === code);
    }

    async add(module: Module) {
        this.data.push(module);
    }

    async clean() {
        this.data = [];
    }
}