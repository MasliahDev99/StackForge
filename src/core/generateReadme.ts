import fs from 'fs';
import path from 'path';
import { UserAnswers } from '../types';

export async function generateReadme(config: UserAnswers) {
  const { projectName, packageManager, tailwindVersion, folderStructure, language,bundler } = config;

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
${folderStructure ??'sin carpetas creadas'}
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

  fs.writeFileSync(path.join(process.cwd(), 'README.md'), content, 'utf-8');
}