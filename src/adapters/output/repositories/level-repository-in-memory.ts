import Level from '../../../core/entities/level';
import LevelRepository from '../../../use-cases/ports/level-repository';

export default class LevelRepositoryInMemory implements LevelRepository {
    private readonly data: Level[] = [];

    findByCode(code: string) {
        return this.data.find(level => level.code === code);
    }

    add(level: Level): void {
        this.data.push(level);
    }
}