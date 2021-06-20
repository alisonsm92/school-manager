import Enrollment from "../../../core/entities/enrollment";
import EnrollmentRequest from "../../../use-cases/ports/enrollment-request";
import EnrollmentRepositoryInMemory from "./enrollment-repository-in-memory";

const enrollmentRequest: EnrollmentRequest = {
    student: {
        name: 'Maria Carolina Fonseca',
        cpf: '755.525.774-26',
        birthDate: '2002-03-12'
    },
    level: 'EM',
    module: '1',
    classRoom: 'A'
};
const enrollment = new Enrollment(enrollmentRequest, 0);

describe('Testing EnrollmentRepository', () => {
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            const result = enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
            expect(result).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            const result = enrollmentRepository.findByCpf(enrollmentRequest.student.cpf);
            expect(result).toBeUndefined();
        });
    });
});