"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAudit = runAudit;
const exec_1 = require("../../utils/exec");
const logger_1 = require("../../utils/logger");
const auditCommands = {
    npm: 'npm audit fix',
    pnpm: 'pnpm audit fix',
};
function getAuditCommand(packageManager) {
    return auditCommands[packageManager];
}
async function runAudit(config) {
    if (!config.installDeps)
        return;
    const command = getAuditCommand(config.packageManager);
    if (!command) {
        logger_1.logger.warn('⚠️ Gestor de paquetes no soportado para auditoría.');
        return;
    }
    try {
        console.log();
        logger_1.logger.title('AUDITORÍA DE SEGURIDAD');
        console.log();
        logger_1.logger.info('ℹ INFO    → Ejecutando auditoría de seguridad...');
        await (0, exec_1.execCommand)(command, { verbose: false });
        logger_1.logger.success('✅ Auditoría completada.');
    }
    catch (error) {
        logger_1.logger.error(error instanceof Error ? error.message : String(error));
        throw new Error(`❌ Auditoría fallida: ${error instanceof Error ? error.message : String(error)}`);
    }
}
//# sourceMappingURL=audit.js.map