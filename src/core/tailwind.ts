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

import fs from 'fs';
import path from 'path';
import { execCommand } from '../utils/exec';
import { UserAnswers } from '../types';
import { logger } from '../utils/logger';

export async function setupTailwind(config: UserAnswers) {
  const version = config.tailwindVersion ?? 'latest';
  logger.info(`Configurando TailwindCSS versión: ${version}`);

  await execCommand(`npm install -D tailwindcss@${version} postcss autoprefixer`);
  await execCommand('npx tailwindcss init -p');

  const cssDir = path.join(process.cwd(), 'src');
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  const targetCss = cssFiles.find(f => f.includes('index')) || cssFiles[0];

  if (targetCss) {
    const cssPath = path.join(cssDir, targetCss);
    const directive = (version === 'latest' || version === '4.1') ? '@tailwind;' : [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;'
    ].join('\n');

    fs.writeFileSync(cssPath, `${directive}\n`, 'utf-8');
    logger.success(`Insertadas directivas Tailwind en ${targetCss}`);
  }

  // Modificar tailwind.config.js si es necesario (aquí podés agregar lógica condicional si querés presets)

  // Configurar vite.config si existe
  const viteConfigTS = path.join(process.cwd(), 'vite.config.ts');
  const viteConfigJS = path.join(process.cwd(), 'vite.config.js');
  const viteConfigFile = fs.existsSync(viteConfigTS) ? viteConfigTS : fs.existsSync(viteConfigJS) ? viteConfigJS : null;

  if (viteConfigFile) {
    let content = fs.readFileSync(viteConfigFile, 'utf-8');

    if (!content.includes('@tailwindcss/vite')) {
      content = `import tailwindcss from '@tailwindcss/vite';\n` + content;
    }

    if (!content.includes('tailwindcss()')) {
      content = content.replace(/plugins:\s*\[/, 'plugins: [tailwindcss(), ');
    }

    fs.writeFileSync(viteConfigFile, content, 'utf-8');
    logger.success(`Tailwind plugin agregado a ${path.basename(viteConfigFile)}`);
  } else {
    logger.warn('vite.config no encontrado, no se aplicó configuración de plugin de Tailwind.');
  }
}