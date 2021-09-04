import Classroom from './classroom';
import Currency from './currency';
import EnrollmentCode from './enrollment-code';
import Invoice from './invoice';
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
    readonly invoices: Invoice[];
    
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
        const installmentAmount = new Currency(this.module.price / this.installments);
        installmentAmount.truncate();
        for(let i = 0; i < this.installments - 1; i++) {
            const invoice = new Invoice({ 
                code: this.code.value, 
                month: i, 
                year: this.issueDate.getFullYear(), 
                amount: installmentAmount.value
            });
            this.invoices.push(invoice);
        }
        const diff = new Currency(this.module.price - installmentAmount.value * this.installments);
        diff.roundUp();
        const lastInvoice = new Invoice({
            code: this.code.value, 
            month: this.invoices.length + 1, 
            year: this.issueDate.getFullYear(), 
            amount: installmentAmount.value + diff.value
        });
        this.invoices.push(lastInvoice);
    }
}