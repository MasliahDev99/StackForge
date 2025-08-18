"use strict";
/**
 * Módulo para la gestión de la configuración de GitHub mediante variables de entorno.
 * Permite establecer, obtener y validar la configuración relacionada con GitHub
 * almacenada en el archivo `.env` y en las variables de entorno en tiempo de ejecución.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGitHubConfig = setGitHubConfig;
exports.getGitHubConfig = getGitHubConfig;
exports.isGitHubSessionValid = isGitHubSessionValid;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envPath = path_1.default.resolve(process.cwd(), '.env');
/**
 * Establece la configuración de GitHub actualizando el archivo `.env` y las variables de entorno en tiempo de ejecución.
 *
 * @param {Object} params - Objeto con los parámetros necesarios para la configuración.
 * @param {string} params.token - Token de autenticación de GitHub.
 * @param {string} params.userName - Nombre de usuario de GitHub.
 */
async function setGitHubConfig({ token, userName }) {
    let envContent = '';
    if (fs_1.default.existsSync(envPath)) {
        envContent = fs_1.default.readFileSync(envPath, 'utf-8');
    }
    const lines = envContent.split('\n').filter(Boolean);
    const updateOrAdd = (key, value) => {
        const index = lines.findIndex(line => line.startsWith(`${key}=`));
        if (index >= 0) {
            lines[index] = `${key}=${value}`;
        }
        else {
            lines.push(`${key}=${value}`);
        }
    };
    updateOrAdd('GITHUB_TOKEN', token);
    updateOrAdd('GITHUB_USERNAME', userName);
    fs_1.default.writeFileSync(envPath, lines.join('\n'));
    // También actualizar en runtime
    process.env.GITHUB_TOKEN = token;
    process.env.GITHUB_USERNAME = userName;
}
function readEnvFile() {
    if (!fs_1.default.existsSync(envPath))
        return {};
    const content = fs_1.default.readFileSync(envPath, 'utf-8');
    return content
        .split('\n')
        .filter(Boolean)
        .map(line => line.trim())
        .filter(line => !line.startsWith('#') && line.includes('='))
        .reduce((acc, line) => {
        const [key, ...rest] = line.split('=');
        if (key) {
            acc[key] = rest.join('=').trim();
        }
        return acc;
    }, {});
}
/**
 * Obtiene la configuración actual de GitHub desde las variables de entorno o el archivo `.env`.
 *
 * @returns {Object} Objeto con el token y nombre de usuario de GitHub, si están definidos.
 * @returns {string | undefined} [token] - Token de autenticación de GitHub.
 * @returns {string | undefined} [userName] - Nombre de usuario de GitHub.
 */
function getGitHubConfig() {
    const envVars = readEnvFile();
    return {
        token: process.env.GITHUB_TOKEN ?? envVars.GITHUB_TOKEN,
        userName: process.env.GITHUB_USERNAME ?? envVars.GITHUB_USERNAME,
    };
}
/**
 * Verifica si la sesión de GitHub es válida comprobando que existan el token y el nombre de usuario en las variables de entorno.
 *
 * @returns {boolean} `true` si ambos valores están definidos, `false` en caso contrario.
 */
function isGitHubSessionValid() {
    return !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_USERNAME;
}
