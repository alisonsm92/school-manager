import Classroom from '../entities/classroom'

interface ClassroomRepository {
    find(level: string, module: string, code: string): Promise<Classroom|undefined>
    add(classroom: Classroom): Promise<void>
    update(classroom: Classroom): Promise<void>
    clean(): Promise<void>
}

export default ClassroomRepository
