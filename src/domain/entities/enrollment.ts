import ClassRoom from './class-room';
import Level from './level';
import Module from './module';
import Student from './student';

export default class Enrollment {
    readonly student: Student;
    readonly level: Level;
    readonly module: Module;
    readonly classRoom: ClassRoom;
    readonly code: string;
    
    constructor({ student, level, module, classRoom, sequence }:
        { student: Student, level: Level, module: Module, classRoom: ClassRoom, sequence: number }) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classRoom = classRoom;
        this.code = this.generateCode(sequence + 1);
    }

    generateCode(sequence: number): string {
        const fullYear = new Date().getFullYear();
        const sequenceWithPad = sequence.toString().padStart(4, '0');
        return `${fullYear}${this.level.code}${this.module.code}${this.classRoom.code}${sequenceWithPad}`;
    }
}