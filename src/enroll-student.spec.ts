import EnrollStudent from './enroll-student';
import EnrollmentRequest from './enrollment-request';
import Student from './student';

const student: Student = {
    name: 'Ana Clara', 
    cpf: '024.171.100-24' 
};

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid name and cpf', () => {
        const enrollmentRequest: EnrollmentRequest = { student  };
        const sut = new EnrollStudent();
        expect(sut.execute(enrollmentRequest)).toBeTruthy();
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
});