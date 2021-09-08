import ClassroomRepository from "../../domain/use-cases/ports/classroom-repository";
import ClassroomRepositoryInMemory from "./classroom-repository-in-memory";


export default class ClassroomRepositoryInMemorySingleton {
    static instance: ClassroomRepository | undefined;

    private constructor () {}

    static getInstance (): ClassroomRepository {
        if (!ClassroomRepositoryInMemorySingleton.instance) {
            ClassroomRepositoryInMemorySingleton.instance = new ClassroomRepositoryInMemory();
        }
        return ClassroomRepositoryInMemorySingleton.instance;
    }

    static destroy () {
        ClassroomRepositoryInMemorySingleton.instance = undefined;
    }
}