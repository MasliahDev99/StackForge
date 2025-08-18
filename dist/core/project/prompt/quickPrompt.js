"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QickPrompt = void 0;
// src/core/project/prompt/quickPrompt.ts
const projectPrompt_1 = require("./projectPrompt");
const promptQuickProject_1 = require("./promptQuickProject");
/**
 * Clase QickPrompt
 *
 * Representa el flujo de configuración rápida en StackForge.
 * Su responsabilidad principal es ejecutar el flujo `PromptQuickProject`,
 * enriquecer las respuestas obtenidas y devolver un objeto `UserAnswers`.
 *
 * QickPrompt se encarga de agilizar la inicialización de proyectos solicitando
 * la mínima información necesaria al usuario, utilizando valores predeterminados
 * o presets configurados previamente. Garantiza que las respuestas sean completas
 * y listas para el resto del proceso de generación de proyectos en StackForge.
 */
class QickPrompt extends projectPrompt_1.ProjectPrompt {
    constructor() { super("qucik"); }
    async run() {
        const answer = await (0, promptQuickProject_1.PromptQuickProject)();
        if (!answer)
            return null;
        this.result = answer;
        return answer;
    }
}
exports.QickPrompt = QickPrompt;
