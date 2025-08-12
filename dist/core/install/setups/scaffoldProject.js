"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldProject = scaffoldProject;
const exec_1 = require("../../../utils/exec");
function getViteCommand(packageManager, projectName, language) {
    const template = language === 'JavaScript' ? 'react' : 'react-ts';
    const lowerName = projectName.toLowerCase();
    return packageManager === 'npm'
        ? `npm create vite@latest ${lowerName} -- --template ${template}`
        : `${packageManager} create vite@latest ${lowerName} --template ${template}`;
}
async function scaffoldProject(config) {
    const { bundler, language, projectName, packageManager } = config;
    switch (bundler) {
        case 'Vite': {
            await (0, exec_1.execCommand)(getViteCommand(packageManager, projectName, language), { verbose: false });
            break;
        }
        case "Ninguno":
            await (0, exec_1.execCommand)(`mkdir ${projectName} && cd ${projectName} && npm init -y`, { verbose: false });
            break;
        default:
            console.error(`Error: Ingrese un bundler existente.\n`);
            break;
    }
}
//# sourceMappingURL=scaffoldProject.js.map