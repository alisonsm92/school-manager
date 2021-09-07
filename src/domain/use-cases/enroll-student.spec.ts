import DateHelper from '../../common/date-helper';
import EnrollStudent from './enroll-student';
import EnrollStudentInputData from './ports/enroll-student-input-data';
import EnrollStudentOutputData from './ports/enroll-student-output-data';
import EnrollmentRepository from './ports/enrollment-repository';
import LevelRepository from './ports/level-repository';
import ModuleRepository from './ports/module-repository';
import ClassroomRepository from './ports/classroom-repository';
import EnrollmentRepositoryInMemory from '../../infra/repositories/enrollment-repository-in-memory';
import LevelRepositoryInMemory from '../../infra/repositories/level-repository-in-memory';
import ModuleRepositoryInMemory from '../../infra/repositories/module-repository-in-memory';
import ClassRepositoryInMemory from '../../infra/repositories/classroom-repository-in-memory';
import LevelBuilder from './__test__/level-builder';
import ModuleBuilder from './__test__/module-builder';
import ClassroomBuilder from './__test__/classroom-builder';
import RepositoryTestFactory from './__test__/repository-test-factory';

const aMonthAgo = DateHelper.getDateBefore({ days: 30 });
const aMonthAfter = DateHelper.getDateAfter({ days: 30 });
const inputData: EnrollStudentInputData = {
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

function sumInvoicesAmount(accumulator: number, current: EnrollStudentOutputData['invoices'][number]) {
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
        const enrollment = sut.execute(inputData);
        expect(enrollment).toHaveProperty('student.name', inputData.student.name);
        expect(enrollment).toHaveProperty('student.cpf', inputData.student.cpf);
        expect(enrollment).toHaveProperty('student.birthDate', new Date(inputData.student.birthDate));
        expect(enrollment).toHaveProperty('level', inputData.level);
        expect(enrollment).toHaveProperty('module', inputData.module);
        expect(enrollment).toHaveProperty('classroom', inputData.classroom);
    });
    
    test('Should not enroll without valid student name', () => {
        const student: EnrollStudentInputData['student'] = { ...inputData.student, name: 'Ana' };
        const error = new Error('Invalid student name');
        expect(() => sut.execute({ ...inputData, student })).toThrow(error);
    });

    test('Should not enroll without valid student cpf', () => {
        const student: EnrollStudentInputData['student'] = { 
            ...inputData.student, 
            cpf: '123.456.789-99' 
        };
        const error = new Error('Invalid student cpf');
        expect(() => sut.execute({ ...inputData, student })).toThrow(error);
    });

    test('Should not enroll duplicated student', () => {
        const error = new Error('Enrollment with duplicated student is not allowed');
        sut.execute(inputData);
        expect(() => sut.execute(inputData)).toThrow(error);
    });

    test('Should generate enrollment code', () => {
        expect(sut.execute(inputData)).toHaveProperty('code', '2021EM1A0001');
    });

    test('Should not enroll student below minimum age', () => {
        const student: EnrollStudentInputData['student'] = { 
            ...inputData.student, 
            birthDate: new Date('2012-03-12')
        };
        const error = new Error('Student below minimum age');
        expect(() => sut.execute({ ...inputData, student })).toThrow(error);
    });

    test('Should not enroll student over classroom capacity', () => {
        const classroom = new ClassroomBuilder().withCapacity(1).build();
        classroomRepository.update(classroom);
        const secondStudent: EnrollStudentInputData['student'] = { 
            ...inputData.student, 
            name: 'Pedro da Silva',
            cpf: '151.906.420-97'
        };
        const error = new Error('Class is over capacity');
        sut.execute(inputData);
        expect(() => sut.execute({ ...inputData, student: secondStudent })).toThrow(error);
    });

    test('Should not enroll after que end of the classroom', () => {
        const yesterDay = DateHelper.getDateBefore({ days: 1 });
        const classroom = new ClassroomBuilder()
            .withStartDate(aMonthAgo)
            .withEndDate(yesterDay)
            .build();
        classroomRepository.update(classroom);
        expect(() => sut.execute(inputData)).toThrow(new Error('Class is already finished'));
    });

    test('Should not enroll after 25% of the start of the classroom', () => {
        const classroom = new ClassroomBuilder()
            .withStartDate(aMonthAgo)
            .withEndDate(aMonthAfter)
            .build();
        classroomRepository.update(classroom);
        expect(() => sut.execute(inputData)).toThrow(new Error('Class is already started'));
    });

    test('Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice', () => {
        const outputData = sut.execute(inputData);
        const [firstInvoice, ] = outputData.invoices;
        const lastInvoice = outputData.invoices[outputData.invoices.length - 1];
        const invoicesTotalAmount = outputData.invoices.reduce(sumInvoicesAmount, 0);
        expect(outputData.invoices).toHaveLength(inputData.installments);
        expect(invoicesTotalAmount).toBe(new ModuleBuilder().build().price);
        expect(firstInvoice.amount).toBe(1416.66);
        expect(lastInvoice.amount).toBe(1416.74);
    });
});