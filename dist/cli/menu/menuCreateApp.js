"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCreateApp = menuCreateApp;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const stackforgeCreateApp_1 = require("../../core/project/stackforgeCreateApp");
const resume_1 = require("../../utils/resume");
const promptRouter_1 = require("../../core/project/prompt/promptRouter");
// Submenú Crear Aplicación
async function menuCreateApp() {
    while (true) {
        const createOption = await (0, prompts_1.select)({
            message: chalk_1.default.cyan('Crear aplicación:\n'),
            options: [
                { label: 'Crear proyecto rápido', value: 'quick' },
                { label: 'Crear proyecto manual', value: 'manual' },
                { label: 'Volver', value: 'back' },
            ],
        });
        if ((0, prompts_1.isCancel)(createOption) || createOption === 'back')
            return;
        switch (createOption) {
            case 'quick':
                const quickAnswer = await promptRouter_1.PromptRouter.execute("quick");
                if (!quickAnswer)
                    return;
                await (0, stackforgeCreateApp_1.sfCreateApp)(quickAnswer);
                (0, resume_1.showResume)(quickAnswer);
                break;
            case 'manual':
                const answers = await promptRouter_1.PromptRouter.execute("manual");
                if (!answers)
                    return;
                await (0, stackforgeCreateApp_1.sfCreateApp)(answers);
                (0, resume_1.showResume)(answers);
                break;
        }
    }
}
//# sourceMappingURL=menuCreateApp.js.map