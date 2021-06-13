import ModuleRepository from "./module-repository";

describe('Testing ModuleRepository', () => {
    describe('Find method', () => {
        test('Should return the module with level and code provided when it exists', () => {
            const sut = new ModuleRepository();
            const module = sut.find('EM', '1');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('code', '1');
        });
    
        test('Should return undefined when module with the code provided not exists', () => {
            const sut = new ModuleRepository();
            expect(sut.find('EM', '0')).toBeUndefined();
        });
    });
});