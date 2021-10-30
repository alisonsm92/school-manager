import Student from '../../../../domain/entities/student';
import connectionPool from '../../../../infra/database/connection-pool';
import StudentRepositoryDatabase from './student-repository-database';

const inputData = {
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: '2002-03-12T00:00:00.000Z'
};

let sut: StudentRepositoryDatabase;

beforeEach(() => {
    sut = new StudentRepositoryDatabase();
});

afterEach(async () => {
    await sut.clean();
});

afterAll(async () => {
    await connectionPool.end();
});

describe('Testing StudentRepositoryDatabase', () => {
    describe('Find and Add method', () => {
        test('Should return the student with code provided when it exists', async () => {
            await sut.add(new Student(inputData));
            const student = await sut.find(inputData.cpf);
            expect(student?.cpf.value).toBe(inputData.cpf);
            expect(student?.name.value).toBe(inputData.name);
            expect(student?.birthDate).toEqual(new Date(inputData.birthDate));
        });

        test('Should return undefined when the student it is not exists', async () => {
            const student = await sut.find(inputData.cpf);
            expect(student).toBeUndefined();
        });
    });

    describe('Update method', () => {
        it('Should return the student with the data updated', async () => {
            await sut.add(new Student(inputData));
            inputData.name = 'Another name';
            await sut.update(new Student(inputData));
            const student = await sut.find(inputData.cpf);
            expect(student?.name.value).toBe('Another name');
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Student(inputData));
            await sut.clean();
            const student = await sut.find(inputData.cpf);
            expect(student).toBeUndefined();
        });
    });
});