"use strict";
/**
 *  audit  - Auditoria de seguridad
 *
 *  Responsable de:
 *
 *  - Correr npm audit fix (si installDeps === true)
 *  - Mostrar advertencias
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAudit = runAudit;
const exec_1 = require("../utils/exec");
const auditCommands = {
    npm: 'npm audit fix --force',
    pnpm: 'pnpm audit fix --force',
};
async function runAudit(gestor) {
    const command = auditCommands[gestor];
    if (!command) {
        throw new Error(`Gestor no soportado: ${gestor}`);
    }
    await (0, exec_1.execCommand)(command);
}
//# sourceMappingURL=audit.js.map