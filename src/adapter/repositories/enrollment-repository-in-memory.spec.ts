import { EnrollmentStatus } from "../../domain/entities/enrollment";
import EnrollmentBuilder from "../../domain/__test__/enrollment-builder";
import EnrollmentRepositoryInMemory from "./enrollment-repository-in-memory";

const enrollment = new EnrollmentBuilder().build();

describe('Testing EnrollmentRepository', () => {
    describe('FindByCode method', () => {
        test('Should return the enrollment with code provided when it exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            expect(enrollmentRepository.findByCode(enrollment.code.value)).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            expect(enrollmentRepository.findByCode(enrollment.code.value)).toBeUndefined();
        });
    });
    
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            expect(enrollmentRepository.findByCpf(enrollment.student.cpf)).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            expect(enrollmentRepository.findByCpf(enrollment.student.cpf)).toBeUndefined();
        });
    });

    describe('Update method', () => {
        test('Should return the enrollment with the data updated', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            enrollment.status = EnrollmentStatus.CANCELLED;
            enrollmentRepository.update(enrollment);
            const enrollmentAfterUpdate = enrollmentRepository.findByCode(enrollment.code.value);
            expect(enrollmentAfterUpdate?.status).toBe(EnrollmentStatus.CANCELLED);
        });
    });
});