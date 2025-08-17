/**
 * Clase ProjectPrompt
 *
 * Se encarga de centralizar la lógica de los prompts relacionados a la creación de proyectos
 * en StackForge. Actúa como punto de entrada para disparar los flujos de configuración rápida
 * (quick) o manual, según la decisión del usuario.
 *
 * Responsabilidades:
 * - Orquestar la ejecución del prompt de proyecto rápido o manual.
 * - Mantener la coherencia entre las configuraciones y los presets almacenados.
 * - Retornar un objeto de respuestas (`UserAnswers`) listo para iniciar la generación del proyecto.
 */
import { UserAnswers } from "../../../types/UserAnswer";
export declare abstract class ProjectPrompt {
    protected name: string;
    protected result: Partial<UserAnswers>;
    constructor(name: string);
    abstract run(): Promise<UserAnswers | null>;
}
//# sourceMappingURL=projectPrompt.d.ts.map