import ClassRepositoryInMemory from './class-repository-in-memory';

describe('Testing ClassRepository', () => {
    describe('Find method', () => {
        test('Should return the class with code provided when it exists', () => {
            const sut = new ClassRepositoryInMemory();
            const module = sut.find('EM', '1', 'A');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('module', '1');
            expect(module).toHaveProperty('code', 'A');
        });
    });
});