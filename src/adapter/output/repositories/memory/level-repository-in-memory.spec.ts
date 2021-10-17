import Level from '../../../../domain/entities/level';
import LevelRepositoryInMemory from './level-repository-in-memory';

const inputData: Level = {
    code: "EM",
    description: "Ensino Médio"
};

let sut: LevelRepositoryInMemory;

beforeEach(() => {
    sut = new LevelRepositoryInMemory();
});

afterEach(async () => {
    await sut.clean();
});

describe('Testing LevelRepositoryInMemory', () => {
    describe('Find and Add method', () => {
        test('Should return the level with code provided when it exists', async () => {
            await sut.add(inputData);
            const level = await sut.find('EM');
            expect(level).toHaveProperty('code', 'EM');
            expect(level).toHaveProperty('description', 'Ensino Médio');
        });

        test('Should return undefined when the level it is not exists', async () => {
            const level = await sut.find('EM');
            expect(level).toBeUndefined();
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Level(inputData));
            await sut.clean();
            const level = await sut.find('EM');
            expect(level).toBeUndefined();
        });
    });
});