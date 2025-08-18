import { ProjectPrompt } from "./projectPrompt";
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
export declare class QickPrompt extends ProjectPrompt {
    constructor();
    run(): Promise<UserAnswers | null>;
}
