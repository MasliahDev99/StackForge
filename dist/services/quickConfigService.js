"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickConfigService = void 0;
// src/services/quickConfigService.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class QuickConfigService {
    constructor() {
        this.configPath = path_1.default.join(process.env.HOME || process.env.USERPROFILE || ".", ".stackforge", "config.json");
        const dir = path_1.default.dirname(this.configPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
    }
    loadConfig() {
        if (!fs_1.default.existsSync(this.configPath))
            return null;
        return JSON.parse(fs_1.default.readFileSync(this.configPath, "utf-8"));
    }
    saveConfig(config) {
        fs_1.default.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    }
}
exports.quickConfigService = new QuickConfigService();
