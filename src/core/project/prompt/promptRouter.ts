import { ManualPrompt } from "./manualPrompt";
/**
 * Clase encargada de enrutar y ejecutar diferentes tipos de prompts según el tipo especificado.
 * Responsable de instanciar y ejecutar el prompt adecuado (manual o rápido) y devolver las respuestas del usuario.
 * Se utiliza para centralizar la lógica de selección y ejecución de prompts en la aplicación.
 */
import { QickPrompt } from "./quickPrompt";
import { UserAnswers } from "../../../types/UserAnswer";

export class PromptRouter {
    static async execute(type: "manual" | "quick"): Promise<UserAnswers | null> {
        let promptInstance;

        switch(type){
            case "manual":
                promptInstance = new ManualPrompt();
                break;
            case "quick":
                promptInstance = new QickPrompt();
                break;
            default:
                throw new Error(`Tipo de prompt desconocido: ${type}`)

        }
        return await promptInstance.run()
    }
}