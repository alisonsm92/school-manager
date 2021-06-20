import Module from '../../../core/entities/module';
import ModuleRepositoryInMemory from './module-repository-in-memory';

const fakeModule: Module = {
    level: "EM",
    code: "1",
    description: "1o Ano",
    minimumAge: 15,
    price: 17000
};

describe('Testing ModuleRepository', () => {
    describe('Find method', () => {
        test('Should return the module with level and code provided when it exists', () => {
            const sut = new ModuleRepositoryInMemory();
            sut.add(fakeModule);
            const module = sut.find('EM', '1');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('code', '1');
        });
    
        test('Should return undefined when module with the code provided not exists', () => {
            const sut = new ModuleRepositoryInMemory();
            expect(sut.find('EM', '0')).toBeUndefined();
        });
    });
});