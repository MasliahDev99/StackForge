// src/cli/prompts/manualPrompt.ts
import { ProjectPrompt } from "./projectPrompt";
import { promptUser } from "./prompts";
import { UserAnswers } from "../../../types/UserAnswer";

/**
 * Representa el flujo de configuración manual en StackForge.
 * Solicita al usuario todas las opciones paso a paso y devuelve un objeto `UserAnswers` completo.
 */
export class ManualPrompt extends ProjectPrompt {
  constructor() {
    super("manual");
  }

  async run(): Promise<UserAnswers | null> {
    const answers = await promptUser();
    if (!answers) return null;
    this.result = answers;
    return answers;
  }
}