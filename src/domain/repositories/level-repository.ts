import Level from "../entities/level";

interface LevelRepository {
    find(code: string): Promise<Level|undefined>
    add(level: Level): Promise<void>
    clean(): Promise<void>
}

export default LevelRepository;