import ClassRepositoryInMemory from '../adapters/output/repositories/class-repository-in-memory';
import EnrollmentRepositoryInMemory from '../adapters/output/repositories/enrollment-repository-in-memory';
import LevelRepositoryInMemory from '../adapters/output/repositories/level-repository-in-memory';
import ModuleRepositoryInMemory from '../adapters/output/repositories/module-repository-in-memory';
import Class from '../core/entities/class';
import Level from '../core/entities/level';
import Module from '../core/entities/module';
import EnrollStudent from './enroll-student';
import EnrollmentRequest from './ports/enrollment-request';

function getDateAfter(days: number) {
    const date = new Date();
    const calculatedDate = date.getDate() + days;
    date.setDate(calculatedDate);
    return date;
}

function getDateBefore(days: number) {
    const date = new Date();
    const calculatedDate = date.getDate() - days;
    date.setDate(calculatedDate);
    return date;
}

function getDateString(date: Date) {
    return `${date.getUTCFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

const aMonthAgo = getDateBefore(30);
const aMonthAfter = getDateAfter(30);
const fakeLevel: Level = {
    code: "EM",
    description: "Ensino Médio"
};
const fakeModule: Module = {
    level: "EM",
    code: "1",
    description: "1o Ano",
    minimumAge: 15,
    price: 17000
};
const fakeClassRoom = {
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    start_date: getDateString(new Date()),
    end_date: getDateString(aMonthAfter)
};
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
    enrollmentRepository?: EnrollmentRepositoryInMemory,
    levelRepository?: LevelRepositoryInMemory, 
    moduleRepository?: ModuleRepositoryInMemory, 
    classRepository?: ClassRepositoryInMemory 
}

function makeSut(dependencies?: SutDependencies) {
    let enrollmentRepository = dependencies?.enrollmentRepository;
    let levelRepository = dependencies?.levelRepository;
    let moduleRepository = dependencies?.moduleRepository;
    let classRepository = dependencies?.classRepository;
    if(!enrollmentRepository) {
        enrollmentRepository = new EnrollmentRepositoryInMemory();
    }
    if(!levelRepository) {
        levelRepository = new LevelRepositoryInMemory();
        levelRepository.add(fakeLevel);
    }
    if(!moduleRepository) {
        moduleRepository = new ModuleRepositoryInMemory();
        moduleRepository.add(fakeModule);
    }
    if(!classRepository) {
        classRepository = new ClassRepositoryInMemory();
        classRepository.add(new Class(fakeClassRoom));
    }
    return new EnrollStudent({
        enrollmentRepository,
        levelRepository,
        moduleRepository, 
        classRepository,
    });
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
        const fakeClass = { ...fakeClassRoom, capacity: 1 };
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(new Class(fakeClass));
        const secondStudent: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            name: 'Pedro da Silva',
            cpf: '151.906.420-97'
        };
        const error = new Error('Class is over capacity');
        const sut = makeSut({ classRepository: classRepositoryInMemory });
        sut.execute(enrollmentRequest);
        expect(() => sut.execute({ ...enrollmentRequest, student: secondStudent })).toThrow(error);
    });

    test('Should not enroll after que end of the class', () => {
        const yesterDay = getDateBefore(1);
        const fakeClass = { 
            ...fakeClassRoom, 
            start_date: getDateString(aMonthAgo), 
            end_date: getDateString(yesterDay) 
        };
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(new Class(fakeClass));
        const sut = makeSut({ classRepository: classRepositoryInMemory });
        expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Class is already finished'));
    });

    test('Should not enroll after 25% of the start of the class', () => {
        const classData = { 
            ...fakeClassRoom, 
            start_date: getDateString(aMonthAgo), 
            end_date: getDateString(aMonthAfter) 
        };
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(new Class(classData));
        const sut = makeSut({ classRepository: classRepositoryInMemory });
        expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Class is already started'));
    });
});