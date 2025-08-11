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

import { execCommand } from '../../utils/exec'
import { UserAnswers } from "../../types";

import { runAudit } from '../audit/audit';
import { logger } from '../../utils/logger';


function getViteCommand(packageManager:string, projectName:string,language:string):string {
    const template = language === 'JavaScript' ? 'react' : 'react-ts';
    const lowerName = projectName.toLowerCase();

    return packageManager === 'npm'
    ? `npm create vite@latest ${lowerName} -- --template ${template}`
    : `${packageManager} create vite@latest ${lowerName} --template ${template}`;
}


export async function initializeProject(config: UserAnswers) {
    const { bundler, language, projectName, packageManager } = config

    switch(bundler){
        case 'Vite': {
            await execCommand(getViteCommand(packageManager,projectName,language),{verbose: false});
            break;
          }
        case "Ninguno":
            await execCommand(`mkdir ${projectName} && cd ${projectName} && npm init -y`,{verbose:false});
            break;
        default:
            console.error(`Error: Ingrese un bundler existente.\n`)
            break;
    }
    
    
}


export async function installDeps(config: UserAnswers){

   
    // lista de dependencias
    const {depsList, packageManager} = config 

    if(!depsList || depsList.trim() === '')  {
        logger.info('No hay dependencias adicionales para instalar.');
        return;
    }

    try{
        await execCommand(`${packageManager} install ${depsList}`,{verbose:false});
        await runAudit(config);
    }catch(error){
        if (error instanceof Error){
            logger.error(error.message)
        }else{
            logger.error(String(error))
        }
        throw new Error('La instalación fue cancelada debido a vulnerabilidades no resueltas. Por favor revise documentacion de la dependencia.');
    }

}