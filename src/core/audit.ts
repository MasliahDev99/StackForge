/**
 *  audit  - Auditoria de seguridad con Socket.dev/cli
 *  
 *  Responsable de:
 *  
 *  - Correr npm audit fix (si installDeps === true)
 *  - Mostrar advertencias
 */

import { execCommand } from '../utils/exec';
import { UserAnswers } from '../types';
import { logger } from '../utils/logger';
import chalk from 'chalk';


const auditCommands: Record<string, string> = {
  npm: 'npx socket protect || npm audit fix',
  pnpm: 'pnpm exec socket protect',
}

function getAuditCommand(packageManager : string): string | undefined  {
  return auditCommands[packageManager]
}


export async function runAudit(config: UserAnswers) {
  if (!config.installDeps) return;

  let command = getAuditCommand(config.packageManager);

  if (!command) {
    logger.warn('⚠️ Gestor de paquetes no soportado.');
    return;
  }

  try {
    console.log();
    // imprimir título directamente con console.log para evitar que logger lo formatee/trunque
    console.log(chalk.magenta('  === AUDITORÍA DE SEGURIDAD ===  '));
    console.log();
    logger.info('ℹ INFO    → Ejecutando auditoría de seguridad...');
    await execCommand(command,{verbose:false});
  } catch (error) {
    //logger.warn('⚠️ Socket CLI no disponible o falló. Intentando fallback...');

    // fallback si socket falla
    try {
      const fallback = config.packageManager === 'pnpm'
        ? 'pnpm audit fix'
        : 'npm audit fix';

      await execCommand(fallback,{verbose:false});
      logger.success('✅ Auditoría completada con fallback.');
    } catch (fallbackError) {
      //logger.error('❌ Auditoría fallida con fallback también.');
      logger.error(fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
      throw new Error(`❌ Auditoría fallida: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`);
    }
  }
}



