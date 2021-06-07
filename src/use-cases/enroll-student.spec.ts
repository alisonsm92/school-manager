import EnrollStudent from './enroll-student';
import EnrollmentRequest from '../entities/enrollment-request';
import Student from '../entities/student';

const student: Student = {
    name: 'Ana Clara', 
    cpf: '832.081.519-34' 
};

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid name and cpf', () => {
        const enrollmentRequest: EnrollmentRequest = { student  };
        const sut = new EnrollStudent();
        expect(sut.execute(enrollmentRequest)).toEqual({
            student: {
                name: student.name,
                cpf: student.cpf,
            }
        });
    });
    
    test('Should not enroll without valid student name', () => {
        const enrollmentRequest: EnrollmentRequest = { student: { ...student, name: 'Ana' } };
        const error = new Error('Invalid student name');
        const sut = new EnrollStudent();
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });

    test('Should not enroll without valid student cpf', () => {
        const enrollmentRequest: EnrollmentRequest = { 
            student: { ...student, cpf: '123.456.789-99' } 
        };
        const error = new Error('Invalid student cpf');
        const sut = new EnrollStudent();
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });

    test('Should not enroll duplicated student', () => {
        const enrollmentRequest: EnrollmentRequest = { student };
        const error = new Error('Enrollment with duplicated student is not allowed');
        const sut = new EnrollStudent();
        sut.execute(enrollmentRequest);
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });
});