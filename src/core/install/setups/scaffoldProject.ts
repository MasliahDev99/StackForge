import { execCommand } from '../../../utils/exec'
import { UserAnswers } from "../../../types/UserAnswer";



function getViteCommand(packageManager:string, projectName:string,language:string):string {
    const template = language === 'JavaScript' ? 'react' : 'react-ts';
    const lowerName = projectName.toLowerCase();

    return packageManager === 'npm'
    ? `npm create vite@latest ${lowerName} -- --template ${template}`
    : `${packageManager} create vite@latest ${lowerName} --template ${template}`;
}


export async function  scaffoldProject(config: UserAnswers) {
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