import Level from '../../../../domain/entities/level';
import LevelRepository from '../../../../domain/repositories/level-repository';

export default class LevelRepositoryInMemory implements LevelRepository {
    private data: Level[];

    constructor() {
        this.data = [];
    }

    async find(code: string) {
        return this.data.find(level => level.code === code);
    }

    async add(level: Level) {
        this.data.push(level);
    }

    async clean() {
        this.data = [];
    }
}