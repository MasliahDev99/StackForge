/**
 *  alias - Soporte de paths
 *  
 *  Responsable de:
 *  
 *  - Configurar alias en tsconfig.json (@components, @utils, etc.)
 *  
 */

import { UserAnswers } from '../../types/UserAnswer';
import { IProjectStep } from './domain/iProjectStep';
import { setupAliases } from './setup/setupAliases';


export class AliasConfigurator implements IProjectStep {
  async execute(config: UserAnswers): Promise<void> {
    await setupAliases({bundler: config.bundler,language:config.language})
  }
}

export { setupAliases };

