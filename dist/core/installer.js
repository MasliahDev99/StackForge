"use strict";
/**
 *  Installer -  Instalador de dependencias
 *
 *  Responsable de:
 *
 *  - Inicializar proyecto (ej: npm init, vite, create-react-app)
 *  - Instalar dependencias base y dev
 *  - Elegir bundler
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProject = initializeProject;
exports.installDeps = installDeps;
const exec_1 = require("../utils/exec");
const audit_1 = require("./audit");
const logger_1 = require("../utils/logger");
function getViteCommand(packageManager, projectName, language) {
    const template = language === 'JavaScript' ? 'react' : 'react-ts';
    const lowerName = projectName.toLowerCase();
    return packageManager === 'npm'
        ? `npm create vite@latest ${lowerName} -- --template ${template}`
        : `${packageManager} create vite@latest ${lowerName} --template ${template}`;
}
async function initializeProject(config) {
    const { bundler, language, projectName, packageManager } = config;
    switch (bundler) {
        case 'Vite': {
            logger_1.logger.info(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`);
            await (0, exec_1.execCommand)(getViteCommand(packageManager, projectName, language));
            break;
        }
        case "Ninguno":
            logger_1.logger.info(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`);
            await (0, exec_1.execCommand)(`mkdir ${projectName} && cd ${projectName} && npm init -y`);
            break;
        default:
            console.error(`Error: Ingrese un bundler existente.\n`);
            break;
    }
}
async function installDeps(config) {
    // lista de dependencias
    const { depsList, packageManager } = config;
    if (!depsList || depsList.trim() === '') {
        logger_1.logger.info('No hay dependencias adicionales para instalar.');
        return;
    }
    try {
        logger_1.logger.title(`Instalando dependencias adicionales: ${depsList}`);
        await (0, exec_1.execCommand)(`${packageManager} install ${depsList}`);
        logger_1.logger.info('Ejecutando auditoría de seguridad...');
        await (0, audit_1.runAudit)(config);
        logger_1.logger.success('Dependencias instaladas y auditadas correctamente.');
    }
    catch (error) {
        logger_1.logger.error('Error en la instalacion o auditoria de dependencias: ');
        if (error instanceof Error) {
            logger_1.logger.error(error.message);
        }
        else {
            logger_1.logger.error(String(error));
        }
        throw new Error('La instalación fue cancelada debido a vulnerabilidades no resueltas. Por favor revise documentacion de la dependencia.');
    }
    logger_1.logger.info(`Lista de dependencias para instalar => ${depsList} con gestor de paquetes => ${packageManager}`);
}
//# sourceMappingURL=installer.js.map