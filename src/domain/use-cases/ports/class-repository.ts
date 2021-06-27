import ClassRoom from "../../entities/class-room";

interface ClassRepository {
    find(level: string, module: string, code: string): ClassRoom|undefined
    add(classRoom: ClassRoom): void
}

export default ClassRepository;