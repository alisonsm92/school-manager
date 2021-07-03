import Classroom from '../../domain/entities/classroom';
import ClassRepositoryInMemory from './classroom-repository-in-memory';

const fakeClassroom = {
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-06-30')
};

describe('Testing ClassRepository', () => {
    describe('Find method', () => {
        test('Should return the classroom with code provided when it exists', () => {
            const sut = new ClassRepositoryInMemory();
            sut.add(new Classroom(fakeClassroom));
            const module = sut.find('EM', '1', 'A');
            expect(module).toHaveProperty('level', 'EM');
            expect(module).toHaveProperty('module', '1');
            expect(module).toHaveProperty('code', 'A');
        });
    });
});