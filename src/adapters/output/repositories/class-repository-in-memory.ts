import Class from '../../../core/entities/class';
import ClassRepository from '../../../use-cases/ports/class-repository';

export default class ClassRepositoryInMemory implements ClassRepository {
    private readonly data: Class[] = [];

    find(level: string, module: string, code: string) {
        return this.data.find(classRoom => 
            classRoom.level === level 
            && classRoom.module === module
            && classRoom.code === code
        );
    }

    add(classRoom: Class): void {
        this.data.push(classRoom);
    }
}