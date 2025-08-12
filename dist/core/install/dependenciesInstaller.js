"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesInstaller = void 0;
const exec_1 = require("../../utils/exec");
const logger_1 = require("../../utils/logger");
const audit_1 = require("../audit/audit");
class DependenciesInstaller {
    async install(config) {
        if (!config.installDeps)
            return;
        // lista de dependencias
        const { depsList, packageManager } = config;
        if (!depsList || depsList.trim() === '') {
            logger_1.logger.info('No hay dependencias adicionales para instalar.');
            return;
        }
        try {
            await (0, exec_1.execCommand)(`${packageManager} install ${depsList}`, { verbose: false });
            await (0, audit_1.runAudit)(config);
        }
        catch (error) {
            if (error instanceof Error) {
                logger_1.logger.error(error.message);
            }
            else {
                logger_1.logger.error(String(error));
            }
            throw new Error('La instalación fue cancelada debido a vulnerabilidades no resueltas. Por favor revise documentacion de la dependencia.');
        }
    }
}
exports.DependenciesInstaller = DependenciesInstaller;
//# sourceMappingURL=dependenciesInstaller.js.map