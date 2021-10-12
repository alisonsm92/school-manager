import Cpf from '../../../../domain/entities/cpf';
import Student from '../../../../domain/entities/student';
import postgresql from '../../../../infra/postgresql';
import StudentRepositoryDatabase from './student-repository-database';

const inputData = {
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: new Date('2002-03-12')
};

let sut: StudentRepositoryDatabase;

beforeEach(() => {
    sut = new StudentRepositoryDatabase();
});

afterEach(async () => {
    await sut.clean();
});

afterAll(async () => {
    await postgresql.end();
});

describe('Testing StudentRepositoryDatabase', () => {
    describe('Find and Add method', () => {
        test('Should return the student with code provided when it exists', async () => {
            await sut.add(new Student(inputData));
            const student = await sut.find(new Cpf('755.525.774-26'));
            expect(student).toHaveProperty('cpf', '755.525.774-26');
            expect(student).toHaveProperty('name', 'Maria Carolina Fonseca');
            expect(student).toHaveProperty('birthDate', new Date('2002-03-12'));
        });

        test('Should return undefined when the student it is not exists', async () => {
            const student = await sut.find(new Cpf('755.525.774-26'));
            expect(student).toBeUndefined();
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Student(inputData));
            await sut.clean();
            const module = await sut.find(new Cpf('755.525.774-26'));
            expect(module).toBeUndefined();
        });
    });
});