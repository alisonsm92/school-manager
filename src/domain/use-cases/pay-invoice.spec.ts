import RepositoryAbstractFactory from "../../app/factories/repository-abstract-factory";
import RepositoryInMemoryFactory from "../../app/factories/repository-in-memory-factory";
import EnrollStudent from "./enroll-student";
import GetEnrollment from "./get-enrollment";
import PayInvoice from "./pay-invoice";
import EnrollStudentInputData from "./ports/enroll-student-input-data";
import PayInvoiceInputData from "./ports/pay-invoice-input-data";
import ClassroomBuilder from "./__test__/classroom-builder";
import LevelBuilder from "./__test__/level-builder";
import ModuleBuilder from "./__test__/module-builder";

const enrollStudentInputData: EnrollStudentInputData = {
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

let repositoryFactory: RepositoryAbstractFactory;
let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let sut: PayInvoice;

function prePopulateRepositories() {
    repositoryFactory.createLevelRepository().add(new LevelBuilder().build());
    repositoryFactory.createModuleRepository().add(new ModuleBuilder().build());
    repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build());
}

beforeEach(function() {
    repositoryFactory = new RepositoryInMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryFactory);
    getEnrollment = new GetEnrollment(repositoryFactory);
    sut = new PayInvoice(repositoryFactory);
    prePopulateRepositories();
});

describe('Testing pay invoice', () => {
    test('Should pay enrollment invoice', () => {
        const { code } = enrollStudent.execute(enrollStudentInputData);
        const { balance: originalBalance} = getEnrollment.execute({ code, currentDate: new Date() });
        const inputData: PayInvoiceInputData = {
            code,
            month: 1,
            year: 2021,
            amount: 1416.66
        };
        sut.execute(inputData);
        const { balance } = getEnrollment.execute({ code, currentDate: new Date() });
        expect(balance).toBe(originalBalance - inputData.amount);
    });
});