import Module from '../../../../domain/entities/module';
import ModuleRepositoryInMemory from './module-repository-in-memory';

const inputData: Module = {
    level: 'EM',
    code: '1',
    description: '1o Ano',
    minimumAge: 15,
    price: 17000
};

let sut: ModuleRepositoryInMemory;

beforeEach(() => {
    sut = new ModuleRepositoryInMemory();
});

afterEach(async () => {
    await sut.clean();
});

describe('Testing ModuleRepositoryDatabase', () => {
    describe('Find and Add method', () => {
        test('Should return the module with code provided when it exists', async () => {
            await sut.add(inputData);
            const module = await sut.find('EM', '1');
            expect(module).toHaveProperty('code', '1');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('description', '1o Ano');
            expect(module).toHaveProperty('minimumAge', 15);
            expect(module).toHaveProperty('price', 17000);
        });

        test('Should return undefined when the module it is not exists', async () => {
            await sut.add(inputData);
            const module = await sut.find('EM', '2');
            expect(module).toBeUndefined();
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Module(inputData));
            await sut.clean();
            const module = await sut.find('EM', '1');
            expect(module).toBeUndefined();
        });
    });
});