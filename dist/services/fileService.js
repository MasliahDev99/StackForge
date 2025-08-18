"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileService {
    constructor() {
        this.configPath = path_1.default.join(process.env.HOME || process.env.USERPROFILE || '.', '.stackforge', 'config.json');
        if (!fs_1.default.existsSync(path_1.default.dirname(this.configPath))) {
            fs_1.default.mkdirSync(path_1.default.dirname(this.configPath), { recursive: true });
        }
    }
    readConfig() {
        if (!fs_1.default.existsSync(this.configPath))
            return null;
        const raw = fs_1.default.readFileSync(this.configPath, 'utf-8');
        return JSON.parse(raw);
    }
    saveConfig(data) {
        fs_1.default.writeFileSync(this.configPath, JSON.stringify(data, null, 2), 'utf-8');
    }
}
exports.FileService = FileService;
