import RepositoryAbstractFactory from "../../app/factories/repository-abstract-factory";
import RepositoryInMemoryFactory from "../../app/factories/repository-in-memory-factory";
import DateHelper from "../../common/date-helper";
import { InvoiceStatus } from "../entities/invoice";
import EnrollStudent from "./enroll-student";
import GetEnrollment from "./get-enrollment";
import EnrollStudentInputData from "./ports/enroll-student-input-data";
import ModuleRepository from "./ports/module-repository";
import ClassroomBuilder from "./__test__/classroom-builder";
import LevelBuilder from "./__test__/level-builder";
import ModuleBuilder from "./__test__/module-builder";

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

let repositoryFactory: RepositoryAbstractFactory;
let moduleRepository: ModuleRepository;
let enrollStudent: EnrollStudent;
let sut: GetEnrollment;

function prePopulateRepositories() {
    moduleRepository = repositoryFactory.createModuleRepository();
    moduleRepository.add(new ModuleBuilder().build());
    repositoryFactory.createLevelRepository().add(new LevelBuilder().build());
    repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build());
}

beforeEach(function() {
    repositoryFactory = new RepositoryInMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryFactory);
    sut = new GetEnrollment(repositoryFactory);
    prePopulateRepositories();
});

describe('Testing get enrollment', () => {
    test('Should get enrollment by code with invoice balance', () => {
        const enrollment = enrollStudent.execute(inputData);
        const outputData = sut.execute({ code: enrollment.code });
        const module = moduleRepository.find(inputData.level, inputData.module);
        expect(outputData).toHaveProperty('code', enrollment.code);
        expect(outputData).toHaveProperty('student.name', inputData.student.name);
        expect(outputData).toHaveProperty('student.cpf', inputData.student.cpf);
        expect(outputData).toHaveProperty('student.birthDate', new Date(inputData.student.birthDate));
        expect(outputData).toHaveProperty('balance', module?.price);
    });

    test('Should calculate due date and return status open or overdue for each invoice', () => {
        const { code } = enrollStudent.execute(inputData);
        const { invoices } = sut.execute({ code });
        for(let installment = 0; installment < inputData.installments; installment++) {
            const invoice = invoices[installment];
            const currentYear = new Date().getFullYear();
            const month = installment + 1;
            expect(invoice.dueDate).toEqual(new Date(`${currentYear}-${month}-05`));
            if(invoice.dueDate > DateHelper.today())
                expect(invoice.status).toBe(InvoiceStatus.OVERDUE);
            else
                expect(invoice.status).toBe(InvoiceStatus.OPENED);
        }
    });
});