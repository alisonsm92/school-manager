import DateHelper from '../../common/date-helper';
import EnrollStudent from './enroll-student';
import EnrollStudentInputData from '../ports/enroll-student-input-data';
import LevelBuilder from '../__test__/level-builder';
import ModuleBuilder from '../__test__/module-builder';
import ClassroomBuilder from '../__test__/classroom-builder';
import RepositoryInMemoryFactory from '../../adapter/factories/repository-in-memory-factory';
import RepositoryAbstractFactory from '../factories/repository-abstract-factory';
import GetEnrollment from './get-enrollment';
import GetEnrollmentOutputData from '../ports/get-enrollment-output-data';
import ClassroomRepository from '../repositories/classroom-repository';

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
const aMonthAgo = DateHelper.getDateBefore({ days: 30 });
const aMonthAfter = DateHelper.getDateAfter({ days: 30 });

let sut: EnrollStudent;
let getEnrollment: GetEnrollment;
let repositoryFactory: RepositoryAbstractFactory;
let classroomRepository: ClassroomRepository;

function sumInvoicesAmount(accumulator: number, current: GetEnrollmentOutputData['invoices'][number]) {
    return accumulator + current.amount;
};

function prePopulateRepositories() {
    repositoryFactory.createLevelRepository().add(new LevelBuilder().build());
    repositoryFactory.createModuleRepository().add(new ModuleBuilder().build());
    classroomRepository = repositoryFactory.createClassroomRepository();
    classroomRepository.add(new ClassroomBuilder().build());
}

beforeEach(function() {
    repositoryFactory = new RepositoryInMemoryFactory();
    getEnrollment = new GetEnrollment(repositoryFactory);
    sut = new EnrollStudent(repositoryFactory);
    prePopulateRepositories();
});

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid input data', () => {
        const enrollment = sut.execute(inputData);
        expect(enrollment).toHaveProperty('code', '2021EM1A0001');
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
        const { code } = sut.execute(inputData);
        const { invoices } = getEnrollment.execute({ code, currentDate: new Date() });
        const [firstInvoice, ] = invoices;
        const lastInvoice = invoices[invoices.length - 1];
        const invoicesTotalAmount = invoices.reduce(sumInvoicesAmount, 0);
        expect(invoices).toHaveLength(inputData.installments);
        expect(invoicesTotalAmount).toBe(new ModuleBuilder().build().price);
        expect(firstInvoice.amount).toBe(1416.66);
        expect(lastInvoice.amount).toBe(1416.74);
    });
});