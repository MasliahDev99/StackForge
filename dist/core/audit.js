"use strict";
/**
 *  audit  - Auditoria de seguridad con Socket.dev/cli
 *
 *  Responsable de:
 *
 *  - Correr npm audit fix (si installDeps === true)
 *  - Mostrar advertencias
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAudit = runAudit;
const exec_1 = require("../utils/exec");
const logger_1 = require("../utils/logger");
const auditCommands = {
    npm: 'npx socket protect || npm audit fix',
    pnpm: 'pnpm exec socket protect',
};
function getAuditCommand(packageManager) {
    return auditCommands[packageManager];
}
async function runAudit(config) {
    if (!config.installDeps)
        return;
    let command = getAuditCommand(config.packageManager);
    if (!command) {
        logger_1.logger.warn('⚠️ Gestor de paquetes no soportado.');
        return;
    }
    try {
        logger_1.logger.info('ℹ INFO    → Ejecutando auditoría de seguridad...');
        await (0, exec_1.execCommand)(command);
    }
    catch (error) {
        //logger.warn('⚠️ Socket CLI no disponible o falló. Intentando fallback...');
        // fallback si socket falla
        try {
            const fallback = config.packageManager === 'pnpm'
                ? 'pnpm audit fix'
                : 'npm audit fix';
            await (0, exec_1.execCommand)(fallback);
            logger_1.logger.success('✅ Auditoría completada con fallback.');
        }
        catch (fallbackError) {
            //logger.error('❌ Auditoría fallida con fallback también.');
            logger_1.logger.error(fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
            throw new Error(`❌ Auditoría fallida: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`);
        }
    }
}
//# sourceMappingURL=audit.js.map