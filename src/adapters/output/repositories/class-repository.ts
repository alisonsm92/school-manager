type Class = {
    level: string,
    module: string,
    code: string,
    capacity: number
}

const byCode = (code: string) => (classRoom: Class) => classRoom.code === code;

export default class ClassRepository {
    private readonly data = [
        {
            level: "EM",
            module: "3",
            code: "A",
            capacity: 10
        }
    ];

    find(code: string) {
        return this.data.find(byCode(code));
    }
}