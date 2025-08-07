"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptUser = promptUser;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const banner_1 = require("../utils/banner");
async function promptUser() {
    console.clear();
    (0, banner_1.printBanner)();
    console.log(chalk_1.default.cyanBright('\n🛠️  Bienvenido a StackForge CLI\n'));
    console.log();
    const packageManager = await (0, prompts_1.select)({
        message: '📦 ¿Qué gestor de paquetes querés usar?',
        options: [
            { label: 'npm', value: 'npm' },
            { label: 'pnpm', value: 'pnpm' },
        ],
    });
    if ((0, prompts_1.isCancel)(packageManager))
        return cancelAndExit();
    const projectName = await (0, prompts_1.text)({
        message: '📁 Nombre del proyecto:',
        validate: (value) => /^[a-zA-Z0-9-_]+$/.test(value) ? undefined : 'Solo letras, números, guiones y guion bajo.',
    });
    if ((0, prompts_1.isCancel)(projectName))
        return cancelAndExit();
    const packageName = await (0, prompts_1.text)({
        message: '📦 Nombre del package:',
        defaultValue: typeof projectName === 'string'
            ? projectName.toLowerCase().replace(/\s+/g, '-')
            : '',
        validate: (value) => /^[a-z0-9-_]+$/.test(value) ? undefined : 'Solo minúsculas, números, guiones y guion bajo.',
    });
    if ((0, prompts_1.isCancel)(packageName))
        return cancelAndExit();
    const bundler = await (0, prompts_1.select)({
        message: '🔧 ¿Qué bundler querés usar?',
        options: [
            { label: 'Vite', value: 'Vite' },
            { label: 'Ninguno', value: 'Ninguno' },
        ],
    });
    if ((0, prompts_1.isCancel)(bundler))
        return cancelAndExit();
    const language = await (0, prompts_1.select)({
        message: '📝 ¿Qué lenguaje querés usar?',
        options: [
            { label: 'TypeScript', value: 'TypeScript' },
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'TypeScript + SWC', value: 'TypeScript + SWC' },
        ],
    });
    if ((0, prompts_1.isCancel)(language))
        return cancelAndExit();
    const useTailwind = await (0, prompts_1.confirm)({
        message: '🎨 ¿Querés instalar TailwindCSS?',
        initialValue: true,
    });
    if ((0, prompts_1.isCancel)(useTailwind))
        return cancelAndExit();
    let tailwindVersion = undefined;
    if (useTailwind) {
        tailwindVersion = await (0, prompts_1.select)({
            message: '📦 Elegí versión de TailwindCSS:',
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
            return cancelAndExit();
    }
    const installDeps = await (0, prompts_1.confirm)({
        message: '📚 ¿Querés instalar dependencias adicionales?',
        initialValue: false,
    });
    if ((0, prompts_1.isCancel)(installDeps))
        return cancelAndExit();
    let depsList = undefined;
    if (installDeps) {
        depsList = await (0, prompts_1.text)({
            message: '🔌 Ingresá las dependencias separadas por espacio:',
            validate: (value) => value.trim().length > 0 ? undefined : 'Ingresá al menos una.',
        });
        if ((0, prompts_1.isCancel)(depsList))
            return cancelAndExit();
    }
    const createFolders = await (0, prompts_1.confirm)({
        message: '📁 ¿Querés crear carpetas dentro de src?',
        initialValue: false,
    });
    if ((0, prompts_1.isCancel)(createFolders))
        return cancelAndExit();
    let folderStructure = undefined;
    if (createFolders) {
        folderStructure = await (0, prompts_1.text)({
            message: '📂 Ingresá estructura (ej: pages/auth/{index.ts},shared/hooks/{useFetch.ts}):',
            validate: (value) => value.trim().length > 0 ? undefined : 'Ingresá una estructura válida.',
        });
        if ((0, prompts_1.isCancel)(folderStructure))
            return cancelAndExit();
    }
    (0, prompts_1.outro)(chalk_1.default.green('✅ Configuración lista.\n'));
    const result = {
        projectName: projectName,
        packageName: packageName,
        bundler: bundler,
        language: language,
        useTailwind: useTailwind,
        packageManager: packageManager,
        installDeps,
        createFolders,
    };
    // si no son undefined las agrego al resultado
    if (tailwindVersion !== undefined)
        result.tailwindVersion = tailwindVersion;
    if (depsList !== undefined)
        result.depsList = depsList;
    if (folderStructure !== undefined)
        result.folderStructure = folderStructure;
    return result;
}
function cancelAndExit() {
    (0, prompts_1.cancel)('⛔ Operación cancelada por el usuario.');
    return null;
}
//# sourceMappingURL=prompts.js.map