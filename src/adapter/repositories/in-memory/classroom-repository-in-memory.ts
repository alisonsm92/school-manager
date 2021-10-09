import Classroom from '../../../domain/entities/classroom';
import ClassroomRepository from '../../../domain/repositories/classroom-repository';


export default class ClassroomRepositoryInMemory implements ClassroomRepository {
    private readonly data: Classroom[] = [];

    find(level: string, module: string, code: string) {
        return this.data.find(classroom => 
            classroom.level === level 
            && classroom.module === module
            && classroom.code === code
        );
    }

    add(classroom: Classroom): void {
        this.data.push(classroom);
    }

    update(classroom: Classroom): void {
        const index = this.data.findIndex(item => 
            item.level === classroom.level 
            && item.module === classroom.module
            && item.code === classroom.code);
        this.data[index] = classroom;
    }
}