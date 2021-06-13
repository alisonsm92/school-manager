import EnrollStudent from './enroll-student';
import EnrollmentRequest from './ports/enrollment-request';

const enrollmentRequest: EnrollmentRequest = {
    student: {
        name: "Maria Carolina Fonseca",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12"
    },
    level: "EM",
    module: "1",
    classRoom: "A"
}

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid name and cpf', () => {
        const sut = new EnrollStudent();
        const enrollment = sut.execute(enrollmentRequest);
        expect(enrollment).toHaveProperty('student.name', enrollmentRequest.student.name);
        expect(enrollment).toHaveProperty('student.cpf', enrollmentRequest.student.cpf);
        expect(enrollment).toHaveProperty('student.birthDate', new Date(enrollmentRequest.student.birthDate));
        expect(enrollment).toHaveProperty('level', enrollmentRequest.level);
        expect(enrollment).toHaveProperty('module', enrollmentRequest.module);
        expect(enrollment).toHaveProperty('classRoom', enrollmentRequest.classRoom);
    });
    
    test('Should not enroll without valid student name', () => {
        const student: EnrollmentRequest['student'] = { ...enrollmentRequest.student, name: 'Ana' };
        const error = new Error('Invalid student name');
        const sut = new EnrollStudent();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll without valid student cpf', () => {
        const student: EnrollmentRequest['student'] = { 
            ...enrollmentRequest.student, 
            cpf: '123.456.789-99' 
        };
        const error = new Error('Invalid student cpf');
        const sut = new EnrollStudent();
        expect(() => sut.execute({ ...enrollmentRequest, student })).toThrow(error);
    });

    test('Should not enroll duplicated student', () => {
        const error = new Error('Enrollment with duplicated student is not allowed');
        const sut = new EnrollStudent();
        sut.execute(enrollmentRequest);
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });

    test('Should generate enrollment code', () => {
        const sut = new EnrollStudent();
        expect(sut.execute(enrollmentRequest)).toHaveProperty('code', '2021EM1A0001');
    });
});