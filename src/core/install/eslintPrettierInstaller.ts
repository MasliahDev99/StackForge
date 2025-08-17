/**
 *  eslintPrettier - Linting y Formato
 *  
 *  Responsable de:
 *  
 *  - Instalar y configurar ESLint y Prettier
 *  - Generar .eslintrc, .prettierrc, y configuraciones base
 */
import { UserAnswers } from '../../types/UserAnswer';
import { IInstaller } from './domain/iInstaller';
import { setupLinting } from './setups/setupLinting';




export class ESLintPrettierInstaller implements IInstaller {
  async install(config: UserAnswers): Promise<void> {
        await setupLinting()
  }
}

export { setupLinting };

