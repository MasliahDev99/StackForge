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
export declare class AliasConfigurator implements IProjectStep {
    execute(config: UserAnswers): Promise<void>;
}
export { setupAliases };
//# sourceMappingURL=alias.d.ts.map