"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReadme = generateReadme;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function generateReadme(config) {
    const { projectName, packageManager, tailwindVersion, folderStructure, language, bundler } = config;
    const content = `# ${projectName}

Proyecto generado con StackForge 🚀

## Tech Stack
- Bundler: ${bundler}
- Lenguaje: ${language}
- Estilos: TailwindCSS ${tailwindVersion}
- Linter: ESLint + Prettier
- Gestor de paquetes: ${packageManager}
- Estructura generada:

\`\`\`
${folderStructure ?? 'sin carpetas creadas'}
\`\`\`

## Scripts

\`\`\`bash
${packageManager} dev
${packageManager} build
${packageManager} lint
${packageManager} format
\`\`\`

## Notas
Generado automáticamente con StackForge CLI.
`;
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'README.md'), content, 'utf-8');
}
//# sourceMappingURL=generateReadme.js.map