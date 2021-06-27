import Classroom from './classroom';
import Level from './level';
import Module from './module';
import Student from './student';

export default class Enrollment {
    readonly student: Student;
    readonly level: Level;
    readonly module: Module;
    readonly classroom: Classroom;
    readonly code: string;
    
    constructor({ student, level, module, classroom, sequence }:
        { student: Student, level: Level, module: Module, classroom: Classroom, sequence: number }) {
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
        this.code = this.generateCode(sequence + 1);
    }

    generateCode(sequence: number): string {
        const fullYear = new Date().getFullYear();
        const sequenceWithPad = sequence.toString().padStart(4, '0');
        return `${fullYear}${this.level.code}${this.module.code}${this.classroom.code}${sequenceWithPad}`;
    }
}