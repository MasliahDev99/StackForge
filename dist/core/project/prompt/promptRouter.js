"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptRouter = void 0;
const manualPrompt_1 = require("./manualPrompt");
/**
 * Clase encargada de enrutar y ejecutar diferentes tipos de prompts según el tipo especificado.
 * Responsable de instanciar y ejecutar el prompt adecuado (manual o rápido) y devolver las respuestas del usuario.
 * Se utiliza para centralizar la lógica de selección y ejecución de prompts en la aplicación.
 */
const quickPrompt_1 = require("./quickPrompt");
class PromptRouter {
    static async execute(type) {
        let promptInstance;
        switch (type) {
            case "manual":
                promptInstance = new manualPrompt_1.ManualPrompt();
                break;
            case "quick":
                promptInstance = new quickPrompt_1.QickPrompt();
                break;
            default:
                throw new Error(`Tipo de prompt desconocido: ${type}`);
        }
        return await promptInstance.run();
    }
}
exports.PromptRouter = PromptRouter;
