// src/core/project/prompt/quickPrompt.ts
import { ProjectPrompt } from "./projectPrompt";
import { PromptQuickProject } from "./promptQuickProject";
import { UserAnswers } from "../../../types/UserAnswer";

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
export class QickPrompt extends ProjectPrompt {
    constructor() { super("qucik") }

    async run(): Promise<UserAnswers | null> {
        const answer = await PromptQuickProject();
        if(!answer) return null
        this.result = answer
        return answer
    }
}