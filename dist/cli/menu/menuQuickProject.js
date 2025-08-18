"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuQuickProject = menuQuickProject;
// src/cli/menu/menuQuickProject.ts
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const quickConfigService_1 = require("../../services/quickConfigService");
async function menuQuickProject() {
    const existingConfig = quickConfigService_1.quickConfigService.loadConfig();
    console.clear();
    if (existingConfig) {
        console.log(chalk_1.default.yellow("Configuración existente:"));
        console.table(existingConfig);
        await (0, prompts_1.text)({ message: "Presione Enter para continuar..." });
        console.clear();
    }
    const selected = await (0, prompts_1.multiselect)({
        message: chalk_1.default.cyan(`Seleccione las configuraciones que desea automatizar:\n`),
        initialValues: existingConfig
            ? Object.keys(existingConfig).filter((key) => {
                const value = existingConfig[key];
                return value === true || (typeof value === "string" && value.length > 0);
            })
            : [],
        options: [
            { label: '📦 Nombre del paquete', value: 'packageName' },
            { label: '🎨 Usar TailwindCSS', value: 'useTailwind' },
            { label: '🔗 Usar Git', value: 'useGit' },
            { label: '🔧 Seleccionar Bundler', value: 'bundlerType' },
            { label: '📄 Lenguaje', value: 'languageType' },
            { label: '📦 Gestor de paquetes', value: 'packageManager' },
            { label: "📂 Configurar estructura de carpetas", value: "folderStructure" },
            { label: "📦 Configurar dependencias adicionales", value: "installDeps" },
            { label: "⬅️ Volver al menú anterior", value: "back" }
        ]
    });
    if (typeof selected === "symbol" || selected.includes("back")) {
        console.log(chalk_1.default.yellow("⚠ Operación cancelada"));
        return;
    }
    const config = { ...(existingConfig || {}) };
    if (selected.includes("packageName")) {
        config.packageName = await (0, prompts_1.text)({
            message: "Ingrese el nombre del paquete:",
            initialValue: existingConfig?.packageName || ""
        });
    }
    // Si el usuario seleccionó usar Tailwind, no volver a preguntar; simplemente asigna true
    if (selected.includes("useTailwind")) {
        config.useTailwind = true;
    }
    if (selected.includes("useGit")) {
        config.useGit = true;
    }
    if (selected.includes("bundlerType")) {
        config.bundlerType = await (0, prompts_1.select)({
            message: "Seleccione el bundler:",
            initialValue: existingConfig?.bundlerType || "Vite",
            options: [
                { label: "Vite", value: "Vite" },
                { label: "Ninguno", value: "Ninguno" }
            ]
        });
    }
    if (selected.includes("languageType")) {
        config.languageType = await (0, prompts_1.select)({
            message: "Seleccione el lenguaje:",
            initialValue: existingConfig?.languageType || "TypeScript",
            options: [
                { label: "TypeScript", value: "TypeScript" },
                { label: "JavaScript", value: "JavaScript" },
                { label: "JavaScript + SWC", value: "JavaScript + SWC" },
                { label: "TypeScript + SWC", value: "TypeScript + SWC" }
            ]
        });
    }
    // Solo mostrar el prompt para tailwindVersion si useTailwind fue marcado y config.useTailwind es true
    if (selected.includes("useTailwind") && config.useTailwind) {
        config.tailwindVersion = await (0, prompts_1.select)({
            message: "Seleccione la versión de Tailwind:",
            initialValue: existingConfig?.tailwindVersion || "latest",
            options: [
                { label: "latest", value: "latest" },
                { label: "4.1", value: "4.1" },
                { label: "3.4.17", value: "3.4.17" }
            ]
        });
    }
    if (selected.includes("packageManager")) {
        config.packageManager = await (0, prompts_1.select)({
            message: "Seleccione el gestor de paquetes:",
            initialValue: existingConfig?.packageManager || "npm",
            options: [
                { label: "npm", value: "npm" },
                { label: "pnpm", value: "pnpm" }
            ]
        });
    }
    // Prompt para estructura de carpetas
    if (selected.includes("folderStructure")) {
        config.createFolders = true;
        config.folderStructure = await (0, prompts_1.text)({
            message: "Ingresá estructura (ej: pages, components, shared/hooks/{useFetch.ts}, admin/users/{index.ts}, admin/settings):",
            initialValue: existingConfig?.folderStructure || ""
        });
    }
    // Prompt para dependencias adicionales
    if (selected.includes("installDeps")) {
        config.installDeps = true;
        // Permite ingresar dependencias separadas por coma o espacio
        config.depsList = await (0, prompts_1.text)({
            message: "Ingrese las dependencias adicionales (separadas por espacio, ej: Lucide-react react-router-dom):",
            initialValue: existingConfig?.depsList || ""
        });
    }
    quickConfigService_1.quickConfigService.saveConfig(config);
    const configPath = quickConfigService_1.quickConfigService.configPath ||
        require("path").join(process.cwd(), "quick.config.json");
    console.log(chalk_1.default.green("✅ Configuración rápida guardada"));
    console.log(chalk_1.default.blueBright(`Archivo guardado en: ${configPath}`));
}
