"use strict";
/**
 * Creator es el core del proyecto
 *
 * Responsable de:
 * - Tomar la respuesta de promptUser
 * - Coordinar llamadas: instalador, estructura, tailwind, linters, etc.
 * - Ejecutar el flujo principal de la CLI
 *
 * Orquestador del STACKFORGE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCreator = runCreator;
const installer_1 = require("./installer");
const tailwind_1 = require("./tailwind");
const folderStructure_1 = require("./folderStructure");
const eslintPrettier_1 = require("./eslintPrettier");
const alias_1 = require("./alias");
const generateReadme_1 = require("./generateReadme");
const logger_1 = require("../utils/logger");
async function runCreator(config) {
    //console.clear();
    logger_1.logger.title('INICIANDO GENERACIÓN DEL PROYECTO');
    await (0, installer_1.initializeProject)(config);
    const pathDestino = config.projectName.toLowerCase();
    process.chdir(pathDestino);
    if (config.useTailwind) {
        await (0, tailwind_1.setupTailwind)(config);
    }
    if (config.createFolders) {
        await (0, folderStructure_1.createFolderStructure)(config);
    }
    await (0, eslintPrettier_1.setupLinting)();
    await (0, alias_1.setupAliases)(config);
    if (config.installDeps) {
        await (0, installer_1.installDeps)(config);
    }
    await (0, generateReadme_1.generateReadme)(config);
}
//# sourceMappingURL=creator.js.map