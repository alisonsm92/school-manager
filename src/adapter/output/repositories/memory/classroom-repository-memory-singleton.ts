import ClassroomRepository from "../../../../domain/repositories/classroom-repository";
import ClassroomRepositoryMemory from "./classroom-repository-memory";

export default class ClassroomRepositoryMemorySingleton {
    static instance: ClassroomRepository | undefined;

    private constructor () {}

    static getInstance (): ClassroomRepository {
        if (!ClassroomRepositoryMemorySingleton.instance) {
            ClassroomRepositoryMemorySingleton.instance = new ClassroomRepositoryMemory();
        }
        return ClassroomRepositoryMemorySingleton.instance;
    }

    static destroy () {
        ClassroomRepositoryMemorySingleton.instance = undefined;
    }
}