import Classroom from '../../../../domain/entities/classroom';
import ClassroomRepositoryInMemory from './classroom-repository-in-memory';

const inputData = {
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    startDate: new Date('2021-05-01'),
    endDate: new Date('2021-06-30')
};

describe('Testing ClassRepositoryDatabase', () => {
    describe('Find method', () => {
        test('Should return the classroom with code provided when it exists', async () => {
            const sut = new ClassroomRepositoryInMemory();
            await sut.add(new Classroom(inputData));
            const classroom = await sut.find('EM', '1', 'A');
            expect(classroom).toHaveProperty('code', 'A');
            expect(classroom).toHaveProperty('level', 'EM');
            expect(classroom).toHaveProperty('module', '1');
            expect(classroom).toHaveProperty('capacity', 10);
            expect(classroom).toHaveProperty('startDate', new Date('2021-05-01'));
            expect(classroom).toHaveProperty('endDate', new Date('2021-06-30'));
        });
    });
});