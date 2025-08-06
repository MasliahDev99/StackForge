/**
 *  audit  - Auditoria de seguridad
 *  
 *  Responsable de:
 *  
 *  - Correr npm audit fix (si installDeps === true)
 *  - Mostrar advertencias
 */

import { execCommand } from '../utils/exec';

const auditCommands:Record<string,string> = {
  npm: 'npm audit fix --force',
  pnpm: 'pnpm audit fix --force',
};

export async function runAudit(gestor: string) {
  const command = auditCommands[gestor];
  if (!command) {
    throw new Error(`Gestor no soportado: ${gestor}`);
  }

  await execCommand(command); 
}