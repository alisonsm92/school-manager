import DateHelper from '../../common/date-helper';
import ClassRepositoryInMemory from '../../infra/repositories/classroom-repository-in-memory';
import EnrollmentRepositoryInMemory from '../../infra/repositories/enrollment-repository-in-memory';
import LevelRepositoryInMemory from '../../infra/repositories/level-repository-in-memory';
import ModuleRepositoryInMemory from '../../infra/repositories/module-repository-in-memory';
import Classroom from '../entities/classroom';
import Level from '../entities/level';
import Module from '../entities/module';
import EnrollStudent from './enroll-student';
import EnrollmentRequest from './ports/enrollment-request';

const aMonthAgo = DateHelper.getDateBefore({ days: 30 });
const aMonthAfter = DateHelper.getDateAfter({ days: 30 });
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
const fakeClassroom = {
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    startDate: new Date(),
    endDate: aMonthAfter
};
const enrollmentRequest: EnrollmentRequest = {
    student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: new Date('2002-03-12')
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
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
        classRepository.add(new Classroom(fakeClassroom));
    }
    return new EnrollStudent({
        enrollmentRepository,
        levelRepository,
        moduleRepository, 
        classroomRepository: classRepository,
    });
}

function sumInvoicesAmount(accumulator: any, current: any) {
    return accumulator + current.amount;
};

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid input data', () => {
        const sut = makeSut();
        const enrollment = sut.execute(enrollmentRequest);
        expect(enrollment).toHaveProperty('student.name', enrollmentRequest.student.name);
        expect(enrollment).toHaveProperty('student.cpf', enrollmentRequest.student.cpf);
        expect(enrollment).toHaveProperty('student.birthDate', new Date(enrollmentRequest.student.birthDate));
        expect(enrollment).toHaveProperty('level.code', enrollmentRequest.level);
        expect(enrollment).toHaveProperty('module.code', enrollmentRequest.module);
        expect(enrollment).toHaveProperty('classroom.code', enrollmentRequest.classroom);
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
        expect(sut.execute(enrollmentRequest)).toHaveProperty('code.value', '2021EM1A0001');
    });

    test('Should not enroll student below minimum age', () => {
        const student: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            birthDate: new Date('2012-03-12')
        };
        const error = new Error('Student below minimum age');
        const sut = makeSut();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll student over classroom capacity', () => {
        const fakeClass = { ...fakeClassroom, capacity: 1 };
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(new Classroom(fakeClass));
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

    test('Should not enroll after que end of the classroom', () => {
        const yesterDay = DateHelper.getDateBefore({ days: 1 });
        const classroom = new Classroom({
            ...fakeClassroom, 
            startDate: aMonthAgo,
            endDate: yesterDay
        });
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(classroom);
        const sut = makeSut({ classRepository: classRepositoryInMemory });
        expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Class is already finished'));
    });

    test('Should not enroll after 25% of the start of the classroom', () => {
        const classroom = new Classroom({ 
            ...fakeClassroom, 
            startDate: aMonthAgo,
            endDate: aMonthAfter
        });
        const classRepositoryInMemory = new ClassRepositoryInMemory();
        classRepositoryInMemory.add(classroom);
        const sut = makeSut({ classRepository: classRepositoryInMemory });
        expect(() => sut.execute(enrollmentRequest)).toThrow(new Error('Class is already started'));
    });

    test('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const sut = makeSut();
        const enrollment = sut.execute(enrollmentRequest);
        const [firstInvoice, ] = enrollment.invoices;
        const lastInvoice = enrollment.invoices[enrollment.invoices.length - 1];
        const invoicesTotalAmount = enrollment.invoices.reduce(sumInvoicesAmount, 0);
        expect(enrollment.invoices).toHaveLength(enrollmentRequest.installments);
        expect(invoicesTotalAmount).toBe(fakeModule.price);
        expect(firstInvoice.amount).toBe(1416.66);
        expect(lastInvoice.amount).toBe(1416.74);
    });
});