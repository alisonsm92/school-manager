export default class Level {
    readonly code: string;
    readonly description: string;
    
    constructor({ code, description }: { code: string, description: string }) {
        this.code = code;
        this.description = description;
    }
}