import ClassRepository from "./class-repository";

describe('Testing ClassRepository', () => {
    describe('Find method', () => {
        test('Should return the class with code provided when it exists', () => {
            const sut = new ClassRepository();
            const module = sut.find('A');
            expect(module).toHaveProperty('code', 'A');
        });
    });
});