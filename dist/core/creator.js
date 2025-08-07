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
const generateReadme_1 = require("./generateReadme");
const progressBar_1 = require("../utils/progressBar");
//import path from 'path';
async function runCreator(config) {
    logger_1.logger.title('INICIANDO GENERACIÓN DEL PROYECTO');
    const steps = [
        'Inicializando proyecto',
        'Entrando a la carpeta',
        'Configurando Tailwind',
        'Creando estructura',
        'Configurando Linter',
        'Configurando Alias',
        'Instalando dependencias',
        'Generando README',
    ];
    (0, progressBar_1.initProgressBar)(steps);
    // instalamos el proyecto con la configuracion proporcionada
    await (0, installer_1.initializeProject)(config);
    (0, progressBar_1.advanceStep)('Inicializando proyecto');
    // nos movemos a la carpeta del proyecto con manejo de errores
    try {
        const pathDestino = config.projectName.toLowerCase();
        // const projectPath = path.join(process.cwd(),pathDestino)
        process.chdir(pathDestino);
        (0, progressBar_1.advanceStep)('Entrando a la carpeta');
        // logger.info(`📂 Entrando a la carpeta => ${projectPath}`);
    }
    catch (err) {
        // logger.error(`❌ No se pudo entrar al directorio '${config.projectName}': ${(err as Error).message}`);
        process.exit(1);
    }
    // configuramos tailwind si se selecciono 
    if (config.useTailwind) {
        await (0, tailwind_1.setupTailwind)(config);
        (0, progressBar_1.advanceStep)('Configurando Tailwind');
    }
    // configuramos carpetas iniciales si se selecciono
    if (config.createFolders) {
        await (0, folderStructure_1.createFolderStructure)(config);
        (0, progressBar_1.advanceStep)('Creando Estructura');
    }
    // configuramos alias y formato
    await (0, eslintPrettier_1.setupLinting)();
    (0, progressBar_1.advanceStep)('Configurando Linter');
    await (0, alias_1.setupAliases)(config);
    (0, progressBar_1.advanceStep)('Configurando Alias');
    // se instalan dependencias necesarias proporcionadas por el usuario + auditoria de seguridad
    if (config.installDeps) {
        await (0, installer_1.installDeps)(config);
        (0, progressBar_1.advanceStep)('Instalando Dependencias y Ejecutando auditoría');
    }
    (0, generateReadme_1.generateReadme)(config);
    (0, progressBar_1.advanceStep)('Generando README');
    logger_1.logger.success('✅ Proyecto creado exitosamente.');
    (0, progressBar_1.stopProgressBar)();
}
//# sourceMappingURL=creator.js.map