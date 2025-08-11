"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sfCreateApp = sfCreateApp;
const installer_1 = require("../install/installer");
const tailwind_1 = require("../install/tailwind");
const folderStructure_1 = require("../project/folderStructure");
const eslintPrettier_1 = require("../install/eslintPrettier");
const alias_1 = require("../alias");
const generateReadme_1 = require("../project/generateReadme");
const logger_1 = require("../../utils/logger");
const gitService_1 = require("../git/service/gitService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
async function sfCreateApp(config) {
    logger_1.logger.title('INICIANDO GENERACIÓN DEL PROYECTO - ⚡️ StackForge Create App ⚡️');
    const originalCwd = process.cwd();
    try {
        // 1. Definir path absoluto del proyecto
        const pathDestino = path_1.default.resolve(originalCwd, config.projectName.toLowerCase());
        // 2. Crear proyecto React (Vite u otro)
        logger_1.logger.info('Inicializando proyecto React...');
        await (0, installer_1.initializeProject)(config);
        logger_1.logger.success('Proyecto React inicializado.');
        // 3. Confirmar que la carpeta existe (por si acaso)
        if (!fs_1.default.existsSync(pathDestino)) {
            logger_1.logger.error(`Carpeta destino no existe: ${pathDestino}`);
            throw new Error('La carpeta del proyecto no se creó correctamente.');
        }
        logger_1.logger.success('La ruta existe: ' + pathDestino);
        // 4. Cambiar al directorio del proyecto para operaciones locales
        process.chdir(pathDestino);
        // 5. Instalar Tailwind si corresponde
        if (config.useTailwind) {
            logger_1.logger.info(`Instalando TailwindCSS versión ${config.tailwindVersion}...`);
            await (0, tailwind_1.setupTailwind)(config);
            logger_1.logger.success('TailwindCSS instalado correctamente.');
        }
        // 6. Instalar dependencias adicionales si las hay
        if (config.installDeps && config.depsList) {
            logger_1.logger.info('Instalando dependencias adicionales...');
            await (0, installer_1.installDeps)(config);
            logger_1.logger.success('Dependencias adicionales instaladas.');
        }
        // 7. Configurar ESLint + Prettier
        logger_1.logger.info('Configurando ESLint y Prettier...');
        await (0, eslintPrettier_1.setupLinting)();
        logger_1.logger.success('ESLint y Prettier configurados.');
        // 8. Configurar aliases de importación
        logger_1.logger.info('Configurando aliases de importación...');
        await (0, alias_1.setupAliases)(config);
        logger_1.logger.success('Aliases configurados.');
        // 9. Crear estructura de carpetas personalizada si aplica
        if (config.createFolders && config.folderStructure) {
            logger_1.logger.info('Creando estructura de carpetas personalizada...');
            await (0, folderStructure_1.createFolderStructure)(config);
            logger_1.logger.success('Estructura de carpetas creada.');
        }
        // 10. Generar README
        logger_1.logger.info('Generando archivo README...');
        await (0, generateReadme_1.generateReadme)(config);
        logger_1.logger.success('README generado.');
        // 11. Si usa Git y tiene configuración
        if (config.useGit && config.gitConfig && config.repoCreation) {
            const gitService = new gitService_1.GitService(config.gitConfig.token);
            // 5.1 Crear repositorio remoto en GitHub
            logger_1.logger.info('Creando repositorio remoto en GitHub...');
            const repoInfo = await gitService.createRepository(config);
            config.repoInfo = repoInfo; // guardamos los datos del repositorio creado 
            logger_1.logger.success(`Repositorio creado: ${repoInfo.url}`);
            // 5.2 Inicializar git localmente y vincular remoto
            logger_1.logger.info('Inicializando repositorio git local...');
            await gitService.initRepository(pathDestino);
            logger_1.logger.info('Agregando remote origin...');
            await gitService.removeRemoteIfExists('origin', pathDestino, true); // método para evitar error si ya existe
            await gitService.addRemote(repoInfo.url, pathDestino, true);
            logger_1.logger.success(`Repositorio vinculado a ${repoInfo.url} exitosamente.`);
            logger_1.logger.info(`Realizando primer commit y push inicial en '${repoInfo.url}' en la rama '${repoInfo.defaultBranch}'... `);
            await gitService.gitPush(pathDestino, repoInfo.defaultBranch, 'primer commit', true);
            logger_1.logger.success('Primer commit subido al repositorio remoto.');
        }
        logger_1.logger.title('PROYECTO CREADO EXITOSAMENTE 🎉');
    }
    catch (error) {
        logger_1.logger.error(`Error durante la creación del proyecto: ${error.message || error}`);
        throw error;
    }
    finally {
        // Volver al directorio original para no afectar otras ejecuciones
        process.chdir(originalCwd);
    }
}
//# sourceMappingURL=stackforgeCreateApp.js.map