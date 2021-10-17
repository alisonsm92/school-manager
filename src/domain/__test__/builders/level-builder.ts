import Level from "../../entities/level"

export default class LevelBuilder {
    build() {
        return new Level({
            code: "EM",
            description: "Ensino Médio"
        });
    }
}