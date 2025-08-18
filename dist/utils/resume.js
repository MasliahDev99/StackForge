"use strict";
// src/utils/resume.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showResume = showResume;
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("./logger");
function showResume(config) {
    // console.clear()
    console.log();
    logger_1.logger.title('🧾 StackForge resume:');
    console.log(chalk_1.default.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    if (config.useGit && config.gitConfig?.userName) {
        console.log(chalk_1.default.cyan(`🤖 Usuario de github 👉 ${config.gitConfig.userName}`));
        console.log(chalk_1.default.cyan(`📝 Repositorio  👉 ${config.repoInfo?.name}`));
        console.log(chalk_1.default.cyan(`🔗 Url 👉 ${config.repoInfo?.url}`));
        console.log(chalk_1.default.cyan(`🪾 Rama principal 👉 ${config.repoInfo?.defaultBranch}`));
    }
    console.log(chalk_1.default.cyan(`📁 Proyecto: ${config.projectName}`));
    if (config.bundler === "Vite")
        console.log(chalk_1.default.cyan(`📦 Package: ${config.packageName}`));
    console.log(chalk_1.default.cyan(`🛠️ Bundler: ${config.bundler}`));
    console.log(chalk_1.default.cyan(`📝 Lenguaje: ${config.language}`));
    console.log(chalk_1.default.cyan(`🎨 Tailwind: ${config.useTailwind ? `Sí (v${config.tailwindVersion})` : 'No'}`));
    console.log(chalk_1.default.cyan(`📂 Carpetas creadas: ${config.createFolders ? 'Sí' : 'No'}`));
    if (config.createFolders)
        console.log(chalk_1.default.cyan(`📁 Estructura de carpetas: ${config.folderStructure}`));
    console.log(chalk_1.default.cyan(`📚 Dependencias: ${config.installDeps ? config.depsList || 'Ninguna extra' : 'No se instalaron'}`));
    console.log(chalk_1.default.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
}
