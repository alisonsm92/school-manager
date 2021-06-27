import ClassRoom from '../../domain/entities/class-room';
import ClassRepository from '../../domain/use-cases/ports/class-repository';

export default class ClassRepositoryInMemory implements ClassRepository {
    private readonly data: ClassRoom[] = [];

    find(level: string, module: string, code: string) {
        return this.data.find(classRoom => 
            classRoom.level === level 
            && classRoom.module === module
            && classRoom.code === code
        );
    }

    add(classRoom: ClassRoom): void {
        this.data.push(classRoom);
    }
}