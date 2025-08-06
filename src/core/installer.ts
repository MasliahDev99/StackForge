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

import { execCommand } from '../utils/exec'
import { UserAnswers } from "../types";

import { runAudit } from './audit';
import { logger } from '../utils/logger';

export async function installDependencies(config: UserAnswers) {
    const { bundler, language, projectName, packageManager } = config

    switch(bundler){
        case 'Vite':
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`)
            await execCommand(`${packageManager} create vite@latest ${projectName} -- --template ${language === 'JavaScript' ? 'react' : 'react-ts'}`)
            await execCommand(`ls`)
            break;
        case 'CRA':
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`)
            await execCommand(`${packageManager} create-react-app ${projectName} ${language === 'JavaScript' ? '' : '--template typescript'}`);
            await execCommand(`ls`)
            break;
        case "Ninguno":
            console.log(`Gestor de paquetes: ${packageManager} - Bundler: ${bundler} - lenguaje: ${language} - projectName: ${projectName}`)
            await execCommand(`mkdir ${projectName} && cd ${projectName} && npm init -y`);
            await execCommand(`ls`)
            break;
        default:
            console.error(`Error: Ingrese un bundler existente.\n`)
            break;
    }
    // se mueve a la carpeta del proyecto para asegurar que las dependencias se instalen detro
    process.chdir(projectName);
}


export async function installDeps(config: UserAnswers){

   
    // lista de dependencias
    const {depsList, packageManager} = config 

    if(!depsList || depsList.trim() === '')  {
        logger.info('No hay dependencias adicionales para instalar.');
        return;
    }

    try{
        logger.title(`Instalando dependencias adicionales: ${depsList}`);
        await execCommand(`${packageManager} install ${depsList}`);

        logger.info('Ejecutando auditoría de seguridad...');
        await runAudit(packageManager);

        logger.success('Dependencias instaladas y auditadas correctamente.');
    }catch(error){
        logger.error('Error en la instalacion o auditoria de dependencias: ')
        if (error instanceof Error){
            logger.error(error.message)
        }else{
            logger.error(String(error))
        }
        throw new Error('La instalación fue cancelada debido a vulnerabilidades no resueltas. Por favor revise documentacion de la dependencia.');
    }

    logger.info(`Lista de dependencias para instalar => ${depsList} con gestor de paquetes => ${packageManager}`)

}