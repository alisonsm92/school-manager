import { EnrollmentStatus } from "../../../../domain/entities/enrollment";
import EnrollmentBuilder from "../../../../domain/__test__/enrollment-builder";
import postgresql from "../../../../infra/postgresql";
import ClassroomRepositoryDatabase from "./classroom-repository-database";
import EnrollmentRepositoryDatabase from "./enrollment-repository-database";
import LevelRepositoryDatabase from "./level-repository-database";
import ModuleRepositoryDatabase from "./module-repository-database";

let sut: EnrollmentRepositoryDatabase;
let levelRepository: LevelRepositoryDatabase;
let moduleRepository: ModuleRepositoryDatabase;
let classroomRepository: ClassroomRepositoryDatabase;
const inputData = new EnrollmentBuilder().build();

const prePopulateRepositories = async () => await Promise.all([
    levelRepository.add(inputData.level),
    moduleRepository.add(inputData.module),
    classroomRepository.add(inputData.classroom),
]);

beforeAll(async () => {
    levelRepository = new LevelRepositoryDatabase();
    moduleRepository = new ModuleRepositoryDatabase();
    classroomRepository = new ClassroomRepositoryDatabase();
    await prePopulateRepositories();
});

beforeEach(() => {
    sut = new EnrollmentRepositoryDatabase();
});

afterEach(async () => {
    await sut.clean();
});

afterAll(async () => {
    await Promise.all([
        levelRepository.clean(),
        moduleRepository.clean(),
        classroomRepository.clean()
    ]);
    await postgresql.end();
});

describe('Testing EnrollmentRepositoryDatabase', () => {
    describe('FindByCode method', () => {
        test('Should return the enrollment with code provided when it exists', async () => {
            await sut.add(inputData);
            const result = await sut.findByCode(inputData.code.value);
            expect(result).toEqual(inputData);
        });

        test('Should return undefined when enrollment with the code provided not exists', async () => {
            const result = await sut.findByCode(inputData.code.value);
            expect(result).toBeUndefined();
        });
    });
    
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', async () => {
            await sut.add(inputData);
            const result = await sut.findByCpf(inputData.student.cpf);
            expect(result).toEqual(inputData);
        });

        test('Should return undefined when enrollment with the cpf provided not exists', async () => {
            const result = await sut.findByCpf(inputData.student.cpf);
            expect(result).toBeUndefined();
        });
    });

    describe('Update method', () => {
        test('Should return the enrollment with the data updated', async () => {
            await sut.add(inputData);
            inputData.status = EnrollmentStatus.CANCELLED;
            await sut.update(inputData);
            const enrollmentAfterUpdate = await sut.findByCode(inputData.code.value);
            expect(enrollmentAfterUpdate?.status).toBe(EnrollmentStatus.CANCELLED);
        });
    });
});