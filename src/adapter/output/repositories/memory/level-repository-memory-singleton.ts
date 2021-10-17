import LevelRepository from "../../../../domain/repositories/level-repository";
import LevelRepositoryMemory from "./level-repository-memory";

export default class LevelRepositoryMemorySingleton {
    static instance: LevelRepository | undefined;

    private constructor () {}

    static getInstance (): LevelRepository {
        if (!LevelRepositoryMemorySingleton.instance) {
            LevelRepositoryMemorySingleton.instance = new LevelRepositoryMemory();
        }
        return LevelRepositoryMemorySingleton.instance;
    }

    static destroy () {
        LevelRepositoryMemorySingleton.instance = undefined;
    }
}