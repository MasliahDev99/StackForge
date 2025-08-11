/**
 *  audit  - Auditoría de seguridad básica
 *  
 *  Responsable de:
 *  - Ejecutar `npm audit fix` o `pnpm audit fix` según el gestor de paquetes
 *  - Mostrar advertencias y errores
 * 
 *  Nota: En el futuro se puede integrar Socket.dev, Snyk u otras herramientas
 *  para auditorías más avanzadas con autenticación y escaneo profundo.
 */

import { execCommand } from '../../utils/exec';
import { UserAnswers } from '../../types';
import { logger } from '../../utils/logger';


const auditCommands: Record<string, string> = {
  npm: 'npm audit fix',
  pnpm: 'pnpm audit fix',
};

function getAuditCommand(packageManager: string): string | undefined {
  return auditCommands[packageManager];
}

export async function runAudit(config: UserAnswers) {
  if (!config.installDeps) return;

  const command = getAuditCommand(config.packageManager);

  if (!command) {
    logger.warn('⚠️ Gestor de paquetes no soportado para auditoría.');
    return;
  }

  try {
    console.log();
    logger.title('AUDITORÍA DE SEGURIDAD');
    console.log();
    logger.info('ℹ INFO    → Ejecutando auditoría de seguridad...');
    await execCommand(command, { verbose: false });
    logger.success('✅ Auditoría completada.');
  } catch (error) {
    logger.error(
      error instanceof Error ? error.message : String(error)
    );
    throw new Error(
      `❌ Auditoría fallida: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}