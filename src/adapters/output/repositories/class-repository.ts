import Class from '../../../core/entities/class';

export default class ClassRepository {
    private readonly data: Class[] = [
        {
            level: 'EM',
            module: '1',
            code: 'A',
            capacity: 10
        }
    ];

    find(level: string, module: string, code: string) {
        return this.data.find(classRoom => 
            classRoom.level === level 
            && classRoom.module === module
            && classRoom.code === code
        );
    }
}