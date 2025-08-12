/**
 *  tailwind -  Configurar tailwind
 *
 *  Responsable de:
 *
 *  - Instalar Tailwind si useTailwind === true
 *  - Crear tailwind.config.js
 *  - Modificar index.css con directivas @tailwind
 *
 */
import { UserAnswers } from '../../types';
import { IInstaller } from './domain/iInstaller';
import { setupTailwind } from './setups/setupTailwind';
export declare class TailwindInstaller implements IInstaller {
    install(config: UserAnswers): Promise<void>;
}
export { setupTailwind };
//# sourceMappingURL=tailwind.d.ts.map