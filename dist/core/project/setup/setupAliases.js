"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAliases = setupAliases;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../../../utils/logger");
async function setupAliases({ bundler, language }) {
    const isTS = language.includes('TypeScript');
    try {
        if (isTS) {
            updateTsconfigAlias();
        }
        if (bundler === 'Vite') {
            updateViteAlias();
        }
        if (bundler === 'Ninguno' && !isTS) {
            logger_1.logger.warn('Alias no configurado en proyectos JS sin bundler.');
        }
    }
    catch (err) {
        logger_1.logger.error(`Error al configurar alias: ${err.message}`);
    }
}
function updateTsconfigAlias() {
    const tsconfigPath = path_1.default.join(process.cwd(), 'tsconfig.json');
    if (!fs_1.default.existsSync(tsconfigPath)) {
        logger_1.logger.warn('tsconfig.json no encontrado, se omite configuración de alias.');
        return;
    }
    const raw = fs_1.default.readFileSync(tsconfigPath, 'utf-8');
    const json = JSON.parse(raw);
    json.compilerOptions = json.compilerOptions || {};
    json.compilerOptions.baseUrl = 'src';
    json.compilerOptions.paths = {
        ...(json.compilerOptions.paths || {}),
        '@/*': ['*']
    };
    fs_1.default.writeFileSync(tsconfigPath, JSON.stringify(json, null, 2));
    logger_1.logger.success('Alias configurado en tsconfig.json');
}
function updateViteAlias() {
    const viteConfigTS = path_1.default.join(process.cwd(), 'vite.config.ts');
    const viteConfigJS = path_1.default.join(process.cwd(), 'vite.config.js');
    const viteConfigFile = fs_1.default.existsSync(viteConfigTS)
        ? viteConfigTS
        : fs_1.default.existsSync(viteConfigJS)
            ? viteConfigJS
            : null;
    if (!viteConfigFile) {
        logger_1.logger.warn('vite.config no encontrado (.ts o .js), se omite configuración de alias.');
        return;
    }
    const viteConfigRaw = fs_1.default.readFileSync(viteConfigFile, 'utf-8');
    if (viteConfigRaw.includes("alias:")) {
        logger_1.logger.info('Alias ya configurado en vite.config, se omite.');
        return;
    }
    const aliasSnippet = `  resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },`;
    let updated = viteConfigRaw.replace(/defineConfig\(\{/, match => `${match}\n${aliasSnippet}`);
    if (!viteConfigRaw.includes("import path from 'path'")) {
        updated = `import path from 'path';\n` + updated;
    }
    fs_1.default.writeFileSync(viteConfigFile, updated);
    logger_1.logger.success(`Alias configurado en ${path_1.default.basename(viteConfigFile)}`);
}
//# sourceMappingURL=setupAliases.js.map