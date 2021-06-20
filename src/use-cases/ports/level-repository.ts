import Level from "../../core/entities/level";

interface LevelRepository {
    findByCode(code: string): Level|undefined
    add(level: Level): void
}

export default LevelRepository;