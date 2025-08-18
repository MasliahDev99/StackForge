"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTailwind = setupTailwind;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const exec_1 = require("../../../utils/exec");
const logger_1 = require("../../../utils/logger");
const createBasicHtml_1 = require("./createBasicHtml");
function isModernTailwind(version) {
    return version === 'latest' || version === '4.1';
}
function isVite(bundler) {
    return bundler?.toLowerCase() === 'vite';
}
async function setupTailwind(config) {
    const version = config.tailwindVersion ?? 'latest';
    const isModern = isModernTailwind(version);
    const useVite = isVite(config.bundler);
    if (!useVite && config.bundler === 'Ninguno') {
        logger_1.logger.warn('⚠️ No se detectó bundler. Se instalará TailwindCSS con configuración genérica.');
        await (0, createBasicHtml_1.createBasicIndexHtmlIfNone)();
        logger_1.logger.info('Se creó un index.html base con Tailwind CDN para facilitar el arranque sin bundler.');
        return;
    }
    logger_1.logger.info(`⚙️ Configurando TailwindCSS versión: ${version}`);
    await installTailwind(version, isModern);
    await configureTailwind(version, isModern);
    await insertTailwindDirectives(version);
}
async function installTailwind(version, isModern) {
    const installCmd = isModern
        ? 'npm install -D tailwindcss@latest @tailwindcss/vite'
        : `npm install -D tailwindcss@${version} postcss autoprefixer`;
    await (0, exec_1.execCommand)(installCmd, { verbose: false });
}
async function configureTailwind(version, isModern) {
    if (isModern) {
        const viteConfig = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});`;
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'vite.config.js'), viteConfig, 'utf-8');
        logger_1.logger.success(`✅ vite.config.js configurado para TailwindCSS ${version}`);
        const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`;
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'tailwind.config.js'), config, 'utf-8');
        logger_1.logger.success(`✅ tailwind.config.js generado para TailwindCSS ${version}`);
    }
    else {
        await (0, exec_1.execCommand)('npx tailwindcss init -p', { verbose: false });
        const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`;
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'tailwind.config.js'), config, 'utf-8');
        logger_1.logger.success(`✅ tailwind.config.js configurado para TailwindCSS ${version}`);
    }
}
async function insertTailwindDirectives(version) {
    const cssDir = path_1.default.join(process.cwd(), 'src');
    if (!fs_1.default.existsSync(cssDir))
        return;
    const cssFiles = fs_1.default.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    const targetCss = cssFiles.find(f => f.includes('index')) || cssFiles[0];
    if (!targetCss)
        return;
    const directive = (version === 'latest' || version === '4.1')
        ? '@import "tailwindcss";'
        : ['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n');
    fs_1.default.writeFileSync(path_1.default.join(cssDir, targetCss), `${directive}\n`, 'utf-8');
    logger_1.logger.success(`✅ Directivas Tailwind insertadas en ${targetCss}`);
}
