"use strict";
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
async function setGitHubConfig({ token, userName, email }) {
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
    updateOrAdd('GITHUB_EMAIL', email);
    fs_1.default.writeFileSync(envPath, lines.join('\n'));
    // También actualizar en runtime
    process.env.GITHUB_TOKEN = token;
    process.env.GITHUB_USERNAME = userName;
    process.env.GITHUB_EMAIL = email;
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
function getGitHubConfig() {
    const envVars = readEnvFile();
    return {
        token: process.env.GITHUB_TOKEN ?? envVars.GITHUB_TOKEN,
        userName: process.env.GITHUB_USERNAME ?? envVars.GITHUB_USERNAME,
        email: process.env.GITHUB_EMAIL ?? envVars.GITHUB_EMAIL,
    };
}
function isGitHubSessionValid() {
    return !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_USERNAME && !!process.env.GITHUB_EMAIL;
}
//# sourceMappingURL=envSerivce.js.map