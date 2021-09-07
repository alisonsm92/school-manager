import ClassRepositoryInMemory from '../../infra/repositories/classroom-repository-in-memory';
import ClassroomBuilder from './__test__/classroom-builder';
import ClassroomRepository from './ports/classroom-repository';
import DateHelper from '../../common/date-helper';
import EnrollStudent from './enroll-student';
import EnrollStudentInputData from './ports/enroll-student-input-data';
import EnrollmentRepository from './ports/enrollment-repository';
import EnrollmentRepositoryInMemory from '../../infra/repositories/enrollment-repository-in-memory';
import Invoice from '../entities/invoice';
import LevelBuilder from './__test__/level-builder';
import LevelRepository from './ports/level-repository';
import LevelRepositoryInMemory from '../../infra/repositories/level-repository-in-memory';
import ModuleBuilder from './__test__/module-builder';
import ModuleRepository from './ports/module-repository';
import ModuleRepositoryInMemory from '../../infra/repositories/module-repository-in-memory';
import RepositoryTestFactory from './__test__/repository-test-factory';

const aMonthAgo = DateHelper.getDateBefore({ days: 30 });
const aMonthAfter = DateHelper.getDateAfter({ days: 30 });
const enrollmentInputData: EnrollStudentInputData = {
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

function sumInvoicesAmount(accumulator: number, current: Invoice) {
    return accumulator + current.amount;
};

let sut: EnrollStudent;
let enrollmentRepository: EnrollmentRepository;
let levelRepository: LevelRepository;
let moduleRepository: ModuleRepository;
let classroomRepository: ClassroomRepository;

beforeEach(function() {
    enrollmentRepository = new EnrollmentRepositoryInMemory();
    levelRepository = new LevelRepositoryInMemory();
    moduleRepository = new ModuleRepositoryInMemory();
    classroomRepository = new ClassRepositoryInMemory();
    levelRepository.add(new LevelBuilder().build());
    moduleRepository.add(new ModuleBuilder().build());
    classroomRepository.add(new ClassroomBuilder().build());
    const repositoryMemoryFactory = new RepositoryTestFactory({
        enrollmentRepository, 
        levelRepository, 
        moduleRepository, 
        classroomRepository
    });
    sut = new EnrollStudent(repositoryMemoryFactory);
});

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid input data', () => {
        const enrollment = sut.execute(enrollmentInputData);
        expect(enrollment).toHaveProperty('student.name', enrollmentInputData.student.name);
        expect(enrollment).toHaveProperty('student.cpf', enrollmentInputData.student.cpf);
        expect(enrollment).toHaveProperty('student.birthDate', new Date(enrollmentInputData.student.birthDate));
        expect(enrollment).toHaveProperty('level.code', enrollmentInputData.level);
        expect(enrollment).toHaveProperty('module.code', enrollmentInputData.module);
        expect(enrollment).toHaveProperty('classroom.code', enrollmentInputData.classroom);
    });
    
    test('Should not enroll without valid student name', () => {
        const student: EnrollStudentInputData['student'] = { ...enrollmentInputData.student, name: 'Ana' };
        const error = new Error('Invalid student name');
        expect(() => sut.execute({ ...enrollmentInputData, student })).toThrow(error);
    });

    test('Should not enroll without valid student cpf', () => {
        const student: EnrollStudentInputData['student'] = { 
            ...enrollmentInputData.student, 
            cpf: '123.456.789-99' 
        };
        const error = new Error('Invalid student cpf');
        expect(() => sut.execute({ ...enrollmentInputData, student })).toThrow(error);
    });

    test('Should not enroll duplicated student', () => {
        const error = new Error('Enrollment with duplicated student is not allowed');
        sut.execute(enrollmentInputData);
        expect(() => sut.execute(enrollmentInputData)).toThrow(error);
    });

    test('Should generate enrollment code', () => {
        expect(sut.execute(enrollmentInputData)).toHaveProperty('code.value', '2021EM1A0001');
    });

    test('Should not enroll student below minimum age', () => {
        const student: EnrollStudentInputData['student'] = { 
            ...enrollmentInputData.student, 
            birthDate: new Date('2012-03-12')
        };
        const error = new Error('Student below minimum age');
        expect(() => sut.execute({ ...enrollmentInputData, student })).toThrow(error);
    });

    test('Should not enroll student over classroom capacity', () => {
        const classroom = new ClassroomBuilder().withCapacity(1).build();
        classroomRepository.update(classroom);
        const secondStudent: EnrollStudentInputData['student'] = { 
            ...enrollmentInputData.student, 
            name: 'Pedro da Silva',
            cpf: '151.906.420-97'
        };
        const error = new Error('Class is over capacity');
        sut.execute(enrollmentInputData);
        expect(() => sut.execute({ ...enrollmentInputData, student: secondStudent })).toThrow(error);
    });

    test('Should not enroll after que end of the classroom', () => {
        const yesterDay = DateHelper.getDateBefore({ days: 1 });
        const classroom = new ClassroomBuilder()
            .withStartDate(aMonthAgo)
            .withEndDate(yesterDay)
            .build();
        classroomRepository.update(classroom);
        expect(() => sut.execute(enrollmentInputData)).toThrow(new Error('Class is already finished'));
    });

    test('Should not enroll after 25% of the start of the classroom', () => {
        const classroom = new ClassroomBuilder()
            .withStartDate(aMonthAgo)
            .withEndDate(aMonthAfter)
            .build();
        classroomRepository.update(classroom);
        expect(() => sut.execute(enrollmentInputData)).toThrow(new Error('Class is already started'));
    });

    test('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const enrollment = sut.execute(enrollmentInputData);
        const [firstInvoice, ] = enrollment.invoices;
        const lastInvoice = enrollment.invoices[enrollment.invoices.length - 1];
        const invoicesTotalAmount = enrollment.invoices.reduce(sumInvoicesAmount, 0);
        expect(enrollment.invoices).toHaveLength(enrollmentInputData.installments);
        expect(invoicesTotalAmount).toBe(new ModuleBuilder().build().price);
        expect(firstInvoice.amount).toBe(1416.66);
        expect(lastInvoice.amount).toBe(1416.74);
    });
});