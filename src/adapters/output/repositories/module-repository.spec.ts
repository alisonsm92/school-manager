import ModuleRepository from "./module-repository";

describe('Testing ModuleRepository', () => {
    describe('GetMinimumAge method', () => {
        test('Should return the module minimum age when module with the code provided exists', 
        () => {
            const sut = new ModuleRepository();
            expect(sut.getMinimumAge('1')).toBe(6);
        });
    
        test('Should return undefined when module with the code provided not exists', () => {
            const sut = new ModuleRepository();
            expect(sut.getMinimumAge('0')).toBeUndefined();
        });
    })
});