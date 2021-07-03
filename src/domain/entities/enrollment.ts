import Classroom from './classroom';
import EnrollmentCode from './enrollment-code';
import Level from './level';
import Module from './module';
import Student from './student';

export default class Enrollment {
    readonly student: Student;
    readonly level: Level;
    readonly module: Module;
    readonly classroom: Classroom;
    readonly issueDate: Date;
    readonly sequence: number;
    readonly code: EnrollmentCode;
    
    constructor({ student, level, module, classroom, issueDate, sequence }:
        { student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number }) {
        if(student.age < module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        if(classroom.isFinished()) {
            throw new Error('Class is already finished');
        }
        if(classroom.isStarted()) {
            throw new Error('Class is already started');
        }
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
    }
}