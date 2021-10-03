
import ModuleRepository from "../../domain/repositories/module-repository";
import ModuleRepositoryInMemory from "./module-repository-in-memory";

export default class ModuleRepositoryInMemorySingleton {
    static instance: ModuleRepository | undefined;

    private constructor () {}

    static getInstance (): ModuleRepository {
        if (!ModuleRepositoryInMemorySingleton.instance) {
            ModuleRepositoryInMemorySingleton.instance = new ModuleRepositoryInMemory();
        }
        return ModuleRepositoryInMemorySingleton.instance;
    }

    static destroy () {
        ModuleRepositoryInMemorySingleton.instance = undefined;
    }
}