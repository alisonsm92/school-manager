import EnrollmentRequest from '../../use-cases/ports/enrollment-request';
import Student from './student';

export default class Enrollment {
    readonly student: Student;
    readonly level: string;
    readonly module: string;
    readonly classRoom: string;
    readonly code: string;
    
    constructor(student: Student, enrollmentRequest: EnrollmentRequest, sequence: number) {
        this.student = student;
        this.level = enrollmentRequest.level;
        this.module = enrollmentRequest.module;
        this.classRoom = enrollmentRequest.classRoom;
        this.code = this.generateCode(sequence+1);
    }

    generateCode(sequence: number): string {
        const fullYear = new Date().getFullYear();
        const sequenceWithPad = sequence.toString().padStart(4, '0');
        return `${fullYear}${this.level}${this.module}${this.classRoom}${sequenceWithPad}`;
    }
}