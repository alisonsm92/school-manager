import Class from "../../core/entities/class";

interface ClassRepository {
    find(level: string, module: string, code: string): Class|undefined
    add(classRoom: Class): void
}

export default ClassRepository;