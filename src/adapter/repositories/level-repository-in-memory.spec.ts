import Level from '../../domain/entities/level';
import LevelRepositoryInMemory from './level-repository-in-memory';

const fakeLevel: Level = {
    code: "EM",
    description: "Ensino Médio"
};

describe('Testing LevelRepository', () => {
    describe('FindByCode method', () => {
        test('Should return the level with code provided when it exists', () => {
            const sut = new LevelRepositoryInMemory();
            sut.add(fakeLevel);
            const module = sut.findByCode('EM');
            expect(module).toHaveProperty('description', 'Ensino Médio');
        });
    });
});