import Classroom from "../../domain/entities/classroom";
import Enrollment from "../../domain/entities/enrollment";
import Level from "../../domain/entities/level";
import Module from "../../domain/entities/module";
import Student from "../../domain/entities/student";
import EnrollmentRepositoryInMemory from "./enrollment-repository-in-memory";

const fakeStudent = new Student({
    name: 'Maria Carolina Fonseca', 
    cpf: '755.525.774-26', 
    birthDate: '2002-03-12'
});
const fakeLevel = new Level({ code: 'EM', description: 'Ensino Médio' });
const fakeModule = new Module({
    level: 'EM',
    code: '1',
    description: '1o Ano',
    minimumAge: 15,
    price: 17000
});
const fakeClassroom = new Classroom({
    level: 'EM',
    module: '1',
    code: 'A',
    capacity: 10,
    startDate: '2021-01-01',
    endDate: '2021-06-30'
});
const enrollment = new Enrollment({ 
    student: fakeStudent, 
    level: fakeLevel, 
    module: fakeModule, 
    classroom: fakeClassroom, 
    sequence: 0 
});

describe('Testing EnrollmentRepository', () => {
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            expect(enrollmentRepository.findByCpf(fakeStudent.cpf)).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            expect(enrollmentRepository.findByCpf(fakeStudent.cpf)).toBeUndefined();
        });
    });
});