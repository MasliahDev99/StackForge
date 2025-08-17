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
import { UserAnswers } from '../../types/UserAnswer';
import { IInstaller } from './domain/iInstaller';
import { setupTailwind } from './setups/setupTailwind';


export class TailwindInstaller implements IInstaller {
  async install(config: UserAnswers): Promise<void> {
    if (!config.useTailwind) return
    await setupTailwind(config)
  }
}



export { setupTailwind };

