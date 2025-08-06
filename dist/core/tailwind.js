"use strict";
/**
 *  tailwind -  Configurar tailwind
 *
 *  Responsable de:
 *
 *  - Instalar Tailwind si useTailwind === true
 *  - Crear tailwind.config.js
 *  - Modificar index.css con directivas @tailwind
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTailwind = setupTailwind;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const exec_1 = require("../utils/exec");
const logger_1 = require("../utils/logger");
async function setupTailwind(config) {
    const version = config.tailwindVersion ?? 'latest';
    logger_1.logger.info(`Configurando TailwindCSS versión: ${version}`);
    await (0, exec_1.execCommand)(`npm install -D tailwindcss@${version} postcss autoprefixer`);
    await (0, exec_1.execCommand)('npx tailwindcss init -p');
    const cssDir = path_1.default.join(process.cwd(), 'src');
    const cssFiles = fs_1.default.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    const targetCss = cssFiles.find(f => f.includes('index')) || cssFiles[0];
    if (targetCss) {
        const cssPath = path_1.default.join(cssDir, targetCss);
        const directive = (version === 'latest' || version === '4.1') ? '@tailwind;' : [
            '@tailwind base;',
            '@tailwind components;',
            '@tailwind utilities;'
        ].join('\n');
        fs_1.default.writeFileSync(cssPath, `${directive}\n`, 'utf-8');
        logger_1.logger.success(`Insertadas directivas Tailwind en ${targetCss}`);
    }
    // Modificar tailwind.config.js si es necesario (aquí podés agregar lógica condicional si querés presets)
    // Configurar vite.config si existe
    const viteConfigTS = path_1.default.join(process.cwd(), 'vite.config.ts');
    const viteConfigJS = path_1.default.join(process.cwd(), 'vite.config.js');
    const viteConfigFile = fs_1.default.existsSync(viteConfigTS) ? viteConfigTS : fs_1.default.existsSync(viteConfigJS) ? viteConfigJS : null;
    if (viteConfigFile) {
        let content = fs_1.default.readFileSync(viteConfigFile, 'utf-8');
        if (!content.includes('@tailwindcss/vite')) {
            content = `import tailwindcss from '@tailwindcss/vite';\n` + content;
        }
        if (!content.includes('tailwindcss()')) {
            content = content.replace(/plugins:\s*\[/, 'plugins: [tailwindcss(), ');
        }
        fs_1.default.writeFileSync(viteConfigFile, content, 'utf-8');
        logger_1.logger.success(`Tailwind plugin agregado a ${path_1.default.basename(viteConfigFile)}`);
    }
    else {
        logger_1.logger.warn('vite.config no encontrado, no se aplicó configuración de plugin de Tailwind.');
    }
}
//# sourceMappingURL=tailwind.js.map