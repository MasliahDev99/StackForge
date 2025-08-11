"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCLI = menuCLI;
const banner_1 = require("../utils/banner");
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const prompts_2 = require("./prompts/prompts");
const stackforgeCreateApp_1 = require("../core/project/stackforgeCreateApp");
const resume_1 = require("../utils/resume");
const gitService_1 = require("../core/git/service/gitService");
const gitPrompt_1 = require("./prompts/gitPrompt");
const logger_1 = require("../utils/logger");
async function menuCLI() {
    console.clear();
    (0, banner_1.printBanner)();
    while (true) {
        const option = await (0, prompts_1.select)({
            message: chalk_1.default.cyan('Seleccione una opción:\n'),
            options: [
                { label: 'Configurar GitHub', value: 'configGit' },
                { label: 'Crear aplicación', value: 'createApp' },
                { label: 'Salir', value: 'exit' },
            ],
        });
        if ((0, prompts_1.isCancel)(option)) {
            console.clear();
            (0, prompts_1.cancel)('⛔ Operación cancelada.');
            return;
        }
        switch (option) {
            case 'configGit':
                const gitService = new gitService_1.GitService();
                const gitPrompt = new gitPrompt_1.GitPrompt(gitService);
                const config = await gitPrompt.promptGitConfigSimple();
                if (config)
                    logger_1.logger.success(`Configuracion github exitosa!`);
                break;
            case 'createApp':
                const answers = await (0, prompts_2.promptUser)();
                if (!answers)
                    return;
                await (0, stackforgeCreateApp_1.sfCreateApp)(answers);
                (0, resume_1.showResume)(answers);
                break;
            case 'exit':
                console.clear();
                (0, prompts_1.outro)(chalk_1.default.green('¡Hasta luego!'));
                process.exit(0);
        }
    }
}
//# sourceMappingURL=menuCLI.js.map