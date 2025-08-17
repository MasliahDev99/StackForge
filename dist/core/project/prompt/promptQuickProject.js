"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptQuickProject = PromptQuickProject;
const chalk_1 = __importDefault(require("chalk"));
const quickConfigService_1 = require("../../../services/quickConfigService");
const gitPrompt_1 = require("../../git/prompt/gitPrompt");
const gitService_1 = require("../../git/service/gitService");
const prompts_1 = require("@clack/prompts");
const prompts_2 = require("./prompts");
async function PromptQuickProject() {
    // 1. Cargar configuración rápida
    const quickConfig = quickConfigService_1.quickConfigService.loadConfig();
    if (!quickConfig || Object.keys(quickConfig).length === 0) {
        console.log(chalk_1.default.red("❌ No hay configuración rápida guardada."), "\n➡ Ve a:", chalk_1.default.cyan("Configuración -> Configuración rápida"), "para crearla.");
        return null;
    }
    // 2. Mostrar preset actual
    console.log(chalk_1.default.cyan("⚙️ Preset de configuración rápida:"));
    console.table(quickConfig);
    console.log(chalk_1.default.cyanBright("\n----------------------------\n"));
    const result = { ...quickConfig };
    // 3. Nombre del proyecto (siempre obligatorio)
    const projectName = await (0, prompts_1.text)({
        message: "📁 Nombre del proyecto:",
        initialValue: "",
    });
    if ((0, prompts_1.isCancel)(projectName)) {
        console.log(chalk_1.default.red("✖️ Operación cancelada por el usuario."));
        return null;
    }
    result.projectName = projectName;
    // 4. Bundler
    if (!quickConfig.bundlerType) {
        const bundlerChoice = await (0, prompts_1.select)({
            message: "📦 ¿Qué bundler querés usar para el proyecto?",
            options: [
                { value: "Vite", label: "Vite" },
                { value: "Ninguno", label: "Ninguno" },
            ],
        });
        if ((0, prompts_1.isCancel)(bundlerChoice))
            return null;
        result.bundler = bundlerChoice;
    }
    else {
        result.bundler = quickConfig.bundlerType;
    }
    // 5. packageName solo si bundler es "Vite"
    if (result.bundler === "Vite") {
        let packageName;
        if (quickConfig.packageName === undefined) {
            packageName = await (0, prompts_1.text)({
                message: '📦 Nombre del package:',
                defaultValue: typeof projectName === 'string'
                    ? projectName.toLowerCase().replace(/\s+/g, '-')
                    : '',
                validate: (value) => /^[a-z0-9-_]+$/.test(value) ? undefined : 'Solo minúsculas, números, guiones y guion bajo.',
            });
            if ((0, prompts_1.isCancel)(packageName))
                return null;
            result.packageName = packageName;
        }
        else {
            result.packageName = quickConfig.packageName;
        }
    }
    // 6. Git
    if (quickConfig.useGit === undefined) {
        const useGit = await (0, prompts_1.confirm)({
            message: "📚 ¿Querés inicializar proyecto con git?",
            initialValue: false,
        });
        if ((0, prompts_1.isCancel)(useGit))
            return null;
        result.useGit = useGit === true;
    }
    else {
        result.useGit = quickConfig.useGit;
    }
    if (result.useGit) {
        const token = process.env.GITHUB_TOKEN;
        const userName = process.env.GITHUB_USERNAME ?? "";
        if (!token) {
            console.log(chalk_1.default.red("❌ No se encontró el token PAT de GitHub. Configuralo primero."));
            return null;
        }
        const gitService = new gitService_1.GitService(token);
        if (!(await gitService.validateToken())) {
            console.log(chalk_1.default.red("❌ Token inválido o expirado."));
            return null;
        }
        const gitPrompt = new gitPrompt_1.GitPrompt(gitService);
        const repoConfig = await gitPrompt.promptRepoConfig();
        if (!repoConfig)
            return null;
        result.gitConfig = { token, userName };
        result.repoCreation = repoConfig;
    }
    // 7. Tailwind
    if (quickConfig.useTailwind === undefined) {
        const useTailwind = await (0, prompts_1.confirm)({
            message: "🎨 ¿Querés usar Tailwind CSS?",
            initialValue: false,
        });
        if ((0, prompts_1.isCancel)(useTailwind))
            return null;
        result.useTailwind = useTailwind === true;
    }
    else {
        result.useTailwind = quickConfig.useTailwind;
    }
    if (result.useTailwind && !quickConfig.tailwindVersion) {
        const tailwindVersion = await (0, prompts_1.select)({
            message: "🎨 Selecciona versión de Tailwind:",
            options: [
                { label: 'latest', value: 'latest' },
                { label: '4.1', value: '4.1' },
                { label: '3.4.17', value: '3.4.17' },
                { label: '2.2.19', value: '2.2.19' },
                { label: '1.9.6', value: '1.9.6' },
                { label: '0.7.4', value: '0.7.4' },
            ],
        });
        if ((0, prompts_1.isCancel)(tailwindVersion))
            return null;
        result.tailwindVersion = tailwindVersion;
    }
    // 8. createFolders
    if (quickConfig.createFolders === undefined) {
        const folderStructureConfig = await (0, prompts_2.promptFolderStructureConfig)();
        if (!folderStructureConfig)
            return null;
        Object.assign(result, folderStructureConfig);
    }
    else {
        result.createFolders = quickConfig.createFolders;
    }
    // Traza
    console.table(result);
    // 9. installDeps
    if (quickConfig.installDeps === undefined) {
        const depsConfig = await (0, prompts_2.promptDepsConfig)();
        if (!depsConfig)
            return null;
        Object.assign(result, depsConfig);
    }
    else {
        result.installDeps = quickConfig.installDeps;
    }
    // 10. language
    if (quickConfig.languageType === undefined) {
        const language = await (0, prompts_1.select)({
            message: '📝 ¿Qué lenguaje querés usar?',
            options: [
                { label: 'TypeScript', value: 'TypeScript' },
                { label: 'JavaScript', value: 'JavaScript' },
                { label: 'TypeScript + SWC', value: 'TypeScript + SWC' },
            ],
        });
        if ((0, prompts_1.isCancel)(language))
            return null;
        result.language = language;
    }
    else {
        result.language = quickConfig.languageType;
    }
    // 11. packageManager
    if (quickConfig.packageManager === undefined) {
        const packageManager = await (0, prompts_1.select)({
            message: '📦 ¿Qué gestor de paquetes querés usar?',
            options: [
                { label: 'npm', value: 'npm' },
                { label: 'pnpm', value: 'pnpm' },
            ],
        });
        if ((0, prompts_1.isCancel)(packageManager))
            return null;
        result.packageManager = packageManager;
    }
    else {
        result.packageManager = quickConfig.packageManager;
    }
    return result;
}
//# sourceMappingURL=promptQuickProject.js.map