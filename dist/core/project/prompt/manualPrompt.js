"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualPrompt = void 0;
// src/cli/prompts/manualPrompt.ts
const projectPrompt_1 = require("./projectPrompt");
const prompts_1 = require("./prompts");
/**
 * Representa el flujo de configuración manual en StackForge.
 * Solicita al usuario todas las opciones paso a paso y devuelve un objeto `UserAnswers` completo.
 */
class ManualPrompt extends projectPrompt_1.ProjectPrompt {
    constructor() {
        super("manual");
    }
    async run() {
        const answers = await (0, prompts_1.promptUser)();
        if (!answers)
            return null;
        this.result = answers;
        return answers;
    }
}
exports.ManualPrompt = ManualPrompt;
//# sourceMappingURL=manualPrompt.js.map