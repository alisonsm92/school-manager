import ClassRepository from '../adapters/output/repositories/class-repository';
import LevelRepository from '../adapters/output/repositories/level-repository';
import ModuleRepository from '../adapters/output/repositories/module-repository';
import EnrollStudent from './enroll-student';
import EnrollmentRequest from './ports/enrollment-request';

const enrollmentRequest: EnrollmentRequest = {
    student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '1',
    classRoom: 'A'
};

type SutDependencies = {
    levelRepository?: LevelRepository, 
    moduleRepository?: ModuleRepository, 
    classRepository?: ClassRepository 
}

function makeSut(dependencies?: SutDependencies) {
    return new EnrollStudent(
        dependencies?.levelRepository || new LevelRepository(),
        dependencies?.moduleRepository || new ModuleRepository(), 
        dependencies?.classRepository || new ClassRepository(),
    );
}

function makeFakeClass({ capacity = 10 }) {
    return {
        level: 'EM',
        module: '1',
        code: 'A',
        capacity
    };
}

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid name and cpf', () => {
        const sut = makeSut();
        const enrollment = sut.execute(enrollmentRequest);
        expect(enrollment).toHaveProperty('student.name', enrollmentRequest.student.name);
        expect(enrollment).toHaveProperty('student.cpf', enrollmentRequest.student.cpf);
        expect(enrollment).toHaveProperty('student.birthDate', new Date(enrollmentRequest.student.birthDate));
        expect(enrollment).toHaveProperty('level', enrollmentRequest.level);
        expect(enrollment).toHaveProperty('module', enrollmentRequest.module);
        expect(enrollment).toHaveProperty('classRoom', enrollmentRequest.classRoom);
    });
    
    test('Should not enroll without valid student name', () => {
        const student: EnrollmentRequest['student'] = { ...enrollmentRequest.student, name: 'Ana' };
        const error = new Error('Invalid student name');
        const sut = makeSut();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll without valid student cpf', () => {
        const student: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            cpf: '123.456.789-99' 
        };
        const error = new Error('Invalid student cpf');
        const sut = makeSut();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll duplicated student', () => {
        const error = new Error('Enrollment with duplicated student is not allowed');
        const sut = makeSut();
        sut.execute(enrollmentRequest);
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });

    test('Should generate enrollment code', () => {
        const sut = makeSut();
        expect(sut.execute(enrollmentRequest)).toHaveProperty('code', '2021EM1A0001');
    });

    test('Should not enroll student below minimum age', () => {
        const student: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            birthDate: '2012-03-12' 
        };
        const error = new Error('Student below minimum age');
        const sut = makeSut();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll student over class capacity', () => {
        const fakeClass = makeFakeClass({ capacity: 1 });
        ClassRepository.prototype.find = jest.fn().mockImplementation(() => fakeClass);
        const secondStudent: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            name: 'Pedro da Silva',
            cpf: '151.906.420-97'
        };
        const error = new Error('Class is over capacity');
        const sut = makeSut();
        sut.execute(enrollmentRequest);
        expect(() => sut.execute({ ...enrollmentRequest, student: secondStudent })).toThrow(error);
    });
});