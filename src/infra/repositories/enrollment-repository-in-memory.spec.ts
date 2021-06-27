import Enrollment from "../../domain/entities/enrollment";
import Student from "../../domain/entities/student";
import EnrollmentRequest from "../../domain/use-cases/ports/enrollment-request";
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
const student = new Student(
    'Maria Carolina Fonseca', 
    '755.525.774-26', 
    '2002-03-12'
);
const enrollment = new Enrollment(student, enrollmentRequest, 0);

describe('Testing EnrollmentRepository', () => {
    describe('FindByCpf method', () => {
        test('Should return the enrollment with cpf provided when it exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            enrollmentRepository.add(enrollment);
            expect(enrollmentRepository.findByCpf(student.cpf)).toEqual(enrollment);
        });

        test('Should return undefined when enrollment with the code provided not exists', () => {
            const enrollmentRepository = new EnrollmentRepositoryInMemory();
            expect(enrollmentRepository.findByCpf(student.cpf)).toBeUndefined();
        });
    });
});