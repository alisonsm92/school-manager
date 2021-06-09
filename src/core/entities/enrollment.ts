import Student from "./student";

export default class Enrollment {
    readonly student: Student;
    
    constructor(student: Student) {
        this.student = student;
    }
}