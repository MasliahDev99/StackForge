"use strict";
/**
 *  Creator es el core del proyecto
 *
 *  Responsable de:
 *
 *  - Toma la respuesta de promptUser
 *  - Coordinador de llamadas: instalador, estructura, tailwind, linters, etc.
 *  - Ejecuta el flujo principal de CLI
 *
 *  Orquestador del STACKFORGE
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCreator = runCreator;
const installer_1 = require("./installer");
const tailwind_1 = require("./tailwind");
const folderStructure_1 = require("./folderStructure");
const eslintPrettier_1 = require("./eslintPrettier");
const alias_1 = require("./alias");
const logger_1 = require("../utils/logger");
async function runCreator(config) {
    logger_1.logger.title('INICIANDO GENERACIÓN DEL PROYECTO');
    // instalamos el proyecto con la configuracion proporcionada
    await (0, installer_1.installDependencies)(config);
    // configuramos tailwind si se selecciono 
    if (config.useTailwind) {
        await (0, tailwind_1.setupTailwind)(config);
    }
    // configuramos carpetas iniciales si se selecciono
    if (config.createFolders) {
        (0, folderStructure_1.createFolderStructure)(config);
    }
    // configuramos alias y formato
    await (0, eslintPrettier_1.setupLinting)();
    await (0, alias_1.setupAliases)(config);
    // se instalan dependencias necesarias proporcionadas por el usuario + auditoria de seguridad
    if (config.installDeps) {
        await (0, installer_1.installDeps)(config);
    }
    logger_1.logger.success('✅ Proyecto creado exitosamente.');
}
//# sourceMappingURL=creator.js.map