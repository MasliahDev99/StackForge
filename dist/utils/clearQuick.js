"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearQuickConfig = clearQuickConfig;
// src/utils/quickConfigUtils.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
function clearQuickConfig() {
    const configPath = path_1.default.join(os_1.default.homedir(), '.stackforge', 'config.json');
    if (fs_1.default.existsSync(configPath)) {
        fs_1.default.unlinkSync(configPath);
        console.clear();
        console.log(chalk_1.default.green('Configuración de proyecto rápido limpiada exitosamente.'));
    }
    else {
        console.clear();
        console.log(chalk_1.default.yellow('No se encontró configuración de proyecto rápido para limpiar.'));
    }
}
