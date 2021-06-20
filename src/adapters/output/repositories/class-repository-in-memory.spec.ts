import Class from '../../../core/entities/class';
import ClassRepositoryInMemory from './class-repository-in-memory';

const fakeClassRoom = {
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    start_date: "2021-05-01",
    end_date: "2021-06-30"
};

describe('Testing ClassRepository', () => {
    describe('Find method', () => {
        test('Should return the class with code provided when it exists', () => {
            const sut = new ClassRepositoryInMemory();
            sut.add(new Class(fakeClassRoom));
            const module = sut.find('EM', '1', 'A');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('module', '1');
            expect(module).toHaveProperty('code', 'A');
        });
    });
});