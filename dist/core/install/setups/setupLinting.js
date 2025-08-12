"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLinting = setupLinting;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const exec_1 = require("../../../utils/exec");
const logger_1 = require("../../../utils/logger");
async function setupLinting() {
    logger_1.logger.title('Configurando ESLint + Prettier');
    await (0, exec_1.execCommand)('npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier', { verbose: false });
    const eslintConfig = {
        root: true,
        env: { browser: true, es2021: true },
        extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        rules: {}
    };
    const prettierConfig = {
        semi: true,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'none'
    };
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '.eslintrc.json'), JSON.stringify(eslintConfig, null, 2));
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '.prettierrc'), JSON.stringify(prettierConfig, null, 2));
    logger_1.logger.success('ESLint y Prettier configurados correctamente.\n');
}
//# sourceMappingURL=setupLinting.js.map