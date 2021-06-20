import Level from '../../../core/entities/level';

export default class LevelRepositoryInMemory {
    private readonly data: Level[] = [
        {
            code: 'EF1',
            description: 'Ensino Fundamental I'
        },
        {
            code: 'EF2',
            description: 'Ensino Fundamental II'
        },
        {
            code: 'EM',
            description: 'Ensino Médio'
        }
    ];

    findByCode(code: string) {
        return this.data.find(level => level.code === code);
    }
}