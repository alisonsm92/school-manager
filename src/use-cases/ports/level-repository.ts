import Level from "../../core/entities/level";

interface LevelRepository {
    findByCode(code: string): Level|undefined
}

export default LevelRepository;