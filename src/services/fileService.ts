import fs from 'fs'
import path from 'path'


export class FileService {
    private configPath: string;

    constructor() {
        this.configPath = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.stackforge', 'config.json')
        if (!fs.existsSync(path.dirname(this.configPath))) {
            fs.mkdirSync(path.dirname(this.configPath), { recursive: true });
        }
    }
    readConfig<T>(): T | null {
        if (!fs.existsSync(this.configPath)) return null;
        const raw = fs.readFileSync(this.configPath, 'utf-8');
        return JSON.parse(raw) as T;
      }
    
      saveConfig<T>(data: T): void {
        fs.writeFileSync(this.configPath, JSON.stringify(data, null, 2), 'utf-8');
      }
}