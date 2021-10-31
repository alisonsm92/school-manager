import Module from '../../../../domain/entities/module';
import ModuleRepository from '../../../../domain/repositories/module-repository';

export default class ModuleRepositoryMemory implements ModuleRepository {
    private data: Module[];

    constructor() {
        this.data = [];
    }

    async find(level: string, code: string) {
        const row = this.data.find(module => module.level === level && module.code === code);
        return row ? row.clone() : undefined;
    }

    async add(module: Module) {
        this.data.push(module);
    }

    async clean() {
        this.data = [];
    }
}