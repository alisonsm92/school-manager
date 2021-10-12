import Classroom from '../../../../domain/entities/classroom';
import ClassroomRepository from '../../../../domain/repositories/classroom-repository';

export default class ClassroomRepositoryInMemory implements ClassroomRepository {
    private data: Classroom[];

    constructor() {
        this.data = [];
    }

    async find(level: string, module: string, code: string) {
        return this.data.find(classroom => 
            classroom.level === level 
            && classroom.module === module
            && classroom.code === code
        );
    }

    async add(classroom: Classroom) {
        this.data.push(classroom);
    }

    async update(classroom: Classroom) {
        const index = this.data.findIndex(item => 
            item.level === classroom.level 
            && item.module === classroom.module
            && item.code === classroom.code);
        this.data[index] = classroom;
    }

    async clean() {
        this.data = [];
    }
}