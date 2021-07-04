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
    readonly installments: number;
    readonly invoices: Array<any>;
    
    constructor({ student, level, module, classroom, issueDate, sequence, installments }:
        { student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number, installments: number }) {
        if(student.age < module.minimumAge) {
            throw new Error('Student below minimum age');
        }
        if(classroom.isFinished(issueDate)) {
            throw new Error('Class is already finished');
        }
        if(classroom.isStarted(issueDate)) {
            throw new Error('Class is already started');
        }
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
        this.installments = installments;
        this.invoices = [];
        this.generateInvoices();
    }

    generateInvoices() {
        const installmentPrice = Math.trunc((this.module.price / this.installments)*100)/100;
        for(let i = 0; i < this.installments; i++) {
            this.invoices.push({ amount: installmentPrice });
        }
        const diff = Math.trunc((this.module.price - installmentPrice * this.installments) *100) / 100;
        this.invoices[this.invoices.length -1].amount = installmentPrice + diff;
    }
}