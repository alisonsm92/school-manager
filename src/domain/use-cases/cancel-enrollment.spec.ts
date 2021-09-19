import RepositoryAbstractFactory from "../../app/factories/repository-abstract-factory";
import RepositoryInMemoryFactory from "../../app/factories/repository-in-memory-factory";
import { EnrollmentStatus } from "../entities/enrollment";
import CancelEnrollment from "./cancel-enrollment";
import EnrollStudent from "./enroll-student";
import GetEnrollment from "./get-enrollment";
import EnrollStudentInputData from "./ports/enroll-student-input-data";
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
let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let sut: CancelEnrollment;

function prePopulateRepositories() {
    repositoryFactory.createLevelRepository().add(new LevelBuilder().build());
    repositoryFactory.createModuleRepository().add(new ModuleBuilder().build());
    repositoryFactory.createClassroomRepository().add(new ClassroomBuilder().build());
}

beforeEach(function() {
    repositoryFactory = new RepositoryInMemoryFactory();
    enrollStudent = new EnrollStudent(repositoryFactory);
    getEnrollment = new GetEnrollment(repositoryFactory);
    sut = new CancelEnrollment(repositoryFactory);
    prePopulateRepositories();
});

describe('Testing cancel enrollment', () => {
    test('Should cancel enrollment', () => {
        const { code } = enrollStudent.execute(inputData);
        sut.execute({ code });
        const getEnrollmentOutput = getEnrollment.execute({ code, currentDate: new Date() });
        expect(getEnrollmentOutput.status).toBe(EnrollmentStatus.CANCELLED);
    });
});