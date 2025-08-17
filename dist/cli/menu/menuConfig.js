"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuConfig = menuConfig;
const prompts_1 = require("@clack/prompts");
const gitService_1 = require("../../core/git/service/gitService");
const logger_1 = require("../../utils/logger");
const gitPrompt_1 = require("../../core/git/prompt/gitPrompt");
const menuQuickProject_1 = require("./menuQuickProject");
const chalk_1 = __importDefault(require("chalk"));
const clearQuick_1 = require("../../utils/clearQuick");
async function menuConfig() {
    while (true) {
        const configOption = await (0, prompts_1.select)({
            message: chalk_1.default.cyan('Configuración:\n'),
            options: [
                { label: 'Configurar GitHub (Token)', value: 'configGit' },
                { label: 'Configurar proyecto rápido', value: 'quickProject' },
                { label: 'Limpiar configuración de proyecto rápido', value: 'clearQuick' },
                { label: 'Volver', value: 'back' },
            ],
        });
        if ((0, prompts_1.isCancel)(configOption) || configOption === 'back')
            return;
        switch (configOption) {
            case 'configGit':
                const gitService = new gitService_1.GitService();
                const gitPrompt = new gitPrompt_1.GitPrompt(gitService);
                const config = await gitPrompt.promptGitConfigSimple();
                if (config) {
                    const user = await gitService.getUserName();
                    logger_1.logger.success(`Configuración GitHub exitosa! Usuario autenticado: ${chalk_1.default.cyan(user)}`);
                }
                break;
            case 'quickProject':
                console.clear();
                await (0, menuQuickProject_1.menuQuickProject)();
                break;
            case 'clearQuick':
                (0, clearQuick_1.clearQuickConfig)();
                break;
        }
    }
}
//# sourceMappingURL=menuConfig.js.map