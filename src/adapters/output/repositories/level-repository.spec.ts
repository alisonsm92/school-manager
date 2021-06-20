import LevelRepository from './level-repository';

describe('Testing LevelRepository', () => {
    describe('FindByCode method', () => {
        test('Should return the level with code provided when it exists', () => {
            const sut = new LevelRepository();
            const module = sut.findByCode('EM');
            expect(module).toHaveProperty('description', 'Ensino Médio');
        });
    });
});