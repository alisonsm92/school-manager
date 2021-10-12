import Level from '../../../../domain/entities/level';
import postgresql from '../../../../infra/postgresql';
import LevelRepositoryDatabase from './level-repository-database';

const inputData: Level = {
    code: "EM",
    description: "Ensino Médio"
};

let sut: LevelRepositoryDatabase;

beforeEach(() => {
    sut = new LevelRepositoryDatabase();
});

afterEach(async () => {
    await sut.clean();
});

afterAll(async () => {
    await postgresql.end();
});

describe('Testing LevelRepositoryDatabase', () => {
    describe('Find and Add method', () => {
        test('Should return the level with code provided when it exists', async () => {
            await sut.add(inputData);
            const module = await sut.find('EM');
            expect(module).toHaveProperty('code', 'EM');
            expect(module).toHaveProperty('description', 'Ensino Médio');
        });

        test('Should return undefined when the level it is not exists', async () => {
            await sut.add(inputData);
            const module = await sut.find('EF');
            expect(module).toBeUndefined();
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Level(inputData));
            await sut.clean();
            const module = await sut.find('EM');
            expect(module).toBeUndefined();
        });
    });
});