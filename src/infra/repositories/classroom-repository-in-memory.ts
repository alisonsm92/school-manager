import Classroom from '../../domain/entities/classroom';
import ClassroomRepository from '../../domain/use-cases/ports/classroom-repository';

export default class ClassRepositoryInMemory implements ClassroomRepository {
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
}