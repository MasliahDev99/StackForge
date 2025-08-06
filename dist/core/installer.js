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
exports.installDependencies = installDependencies;
exports.installDeps = installDeps;
const exec_1 = require("../utils/exec");
const audit_1 = require("./audit");
const logger_1 = require("../utils/logger");
async function installDependencies(config) {
    const { bundler, language, projectName, packageManager } = config;
    switch (bundler) {
        case 'Vite':
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`);
            await (0, exec_1.execCommand)(`${packageManager} create vite@latest ${projectName} -- --template ${language === 'JavaScript' ? 'react' : 'react-ts'}`);
            await (0, exec_1.execCommand)(`ls`);
            break;
        case 'CRA':
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`);
            await (0, exec_1.execCommand)(`${packageManager} create-react-app ${projectName} ${language === 'JavaScript' ? '' : '--template typescript'}`);
            await (0, exec_1.execCommand)(`ls`);
            break;
        case "Ninguno":
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`);
            await (0, exec_1.execCommand)(`mkdir ${projectName} && cd ${projectName} && npm init -y`);
            await (0, exec_1.execCommand)(`ls`);
            break;
        default:
            console.error(`Error: Ingrese un bundler existente.\n`);
            break;
    }
    // se mueve a la carpeta del proyecto para asegurar que las dependencias se instalen detro
    process.chdir(projectName);
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
        await (0, audit_1.runAudit)(packageManager);
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