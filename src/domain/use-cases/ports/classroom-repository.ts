import Classroom from "../../entities/classroom";

interface ClassroomRepository {
    find(level: string, module: string, code: string): Classroom|undefined
    add(classroom: Classroom): void
}

export default ClassroomRepository;