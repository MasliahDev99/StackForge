import { ProjectPrompt } from "./projectPrompt";
import { UserAnswers } from "../../../types/UserAnswer";
/**
 * Representa el flujo de configuración manual en StackForge.
 * Solicita al usuario todas las opciones paso a paso y devuelve un objeto `UserAnswers` completo.
 */
export declare class ManualPrompt extends ProjectPrompt {
    constructor();
    run(): Promise<UserAnswers | null>;
}
