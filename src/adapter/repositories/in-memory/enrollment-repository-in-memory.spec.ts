import { EnrollmentStatus } from "../../../domain/entities/enrollment";
import EnrollmentBuilder from "../../../domain/__test__/enrollment-builder";
import EnrollmentRepositoryInMemory from "./enrollment-repository-in-memory";

const enrollment = new EnrollmentBuilder().build();

describe('Testing EnrollmentRepository', () => {
    describe('FindByCode method', () => {
        test('Should return the enrollment with code provided when it exists', async () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            const result = await enrollmentRepository.findByCode(enrollment.code.value);
            expect(result).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', async () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            const result = await enrollmentRepository.findByCode(enrollment.code.value);
            expect(result).toBeUndefined();
        });
    });
    
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', async () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            const result = await enrollmentRepository.findByCpf(enrollment.student.cpf);
            expect(result).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', async () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            const result = await enrollmentRepository.findByCpf(enrollment.student.cpf);
            expect(result).toBeUndefined();
        });
    });

    describe('Update method', () => {
        test('Should return the enrollment with the data updated', async () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            enrollment.status = EnrollmentStatus.CANCELLED;
            enrollmentRepository.update(enrollment);
            const enrollmentAfterUpdate = await enrollmentRepository.findByCode(enrollment.code.value);
            expect(enrollmentAfterUpdate?.status).toBe(EnrollmentStatus.CANCELLED);
        });
    });
});