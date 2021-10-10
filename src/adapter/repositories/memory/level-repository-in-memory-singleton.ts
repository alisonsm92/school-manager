import LevelRepository from "../../../domain/repositories/level-repository";
import LevelRepositoryInMemory from "./level-repository-in-memory";

export default class LevelRepositoryInMemorySingleton {
    static instance: LevelRepository | undefined;

    private constructor () {}

    static getInstance (): LevelRepository {
        if (!LevelRepositoryInMemorySingleton.instance) {
            LevelRepositoryInMemorySingleton.instance = new LevelRepositoryInMemory();
        }
        return LevelRepositoryInMemorySingleton.instance;
    }

    static destroy () {
        LevelRepositoryInMemorySingleton.instance = undefined;
    }
}