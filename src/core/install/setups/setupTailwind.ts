import path from "path";
import fs from 'fs'
import { UserAnswers } from "../../../types/UserAnswer";
import { execCommand } from "../../../utils/exec";
import { logger } from "../../../utils/logger";
import { createBasicIndexHtmlIfNone } from "./createBasicHtml";

function isModernTailwind(version : string) : boolean {
  return version === 'latest' || version === '4.1'
}

function isVite(bundler?: string): boolean {
  return bundler?.toLowerCase() === 'vite';
}

export async function setupTailwind(config: UserAnswers) {
  const version = config.tailwindVersion ?? 'latest';
  const isModern = isModernTailwind(version)
  const useVite = isVite(config.bundler)


  if (!useVite && config.bundler === 'Ninguno') {
    logger.warn('⚠️ No se detectó bundler. Se instalará TailwindCSS con configuración genérica.');
    await createBasicIndexHtmlIfNone()
    logger.info('Se creó un index.html base con Tailwind CDN para facilitar el arranque sin bundler.');
    return;
  }

  logger.info(`⚙️ Configurando TailwindCSS versión: ${version}`);
  await installTailwind(version, isModern);
  await configureTailwind(version, isModern);
  await insertTailwindDirectives(version);
}

async function installTailwind(version: string, isModern: boolean) {
  const installCmd = isModern
    ? 'npm install -D tailwindcss@latest @tailwindcss/vite'
    : `npm install -D tailwindcss@${version} postcss autoprefixer`;
  await execCommand(installCmd,{verbose:false});
}

async function configureTailwind(version: string, isModern: boolean) {
  if (isModern) {
    const viteConfig = `import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});`;
    fs.writeFileSync(path.join(process.cwd(), 'vite.config.js'), viteConfig, 'utf-8');
    logger.success(`✅ vite.config.js configurado para TailwindCSS ${version}`);

    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`;
    fs.writeFileSync(path.join(process.cwd(), 'tailwind.config.js'), config, 'utf-8');
    logger.success(`✅ tailwind.config.js generado para TailwindCSS ${version}`);
  } else {
    await execCommand('npx tailwindcss init -p',{verbose:false});

    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`;
    fs.writeFileSync(path.join(process.cwd(), 'tailwind.config.js'), config, 'utf-8');
    logger.success(`✅ tailwind.config.js configurado para TailwindCSS ${version}`);
  }
}

async function insertTailwindDirectives(version: string) {
  const cssDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(cssDir)) return;

  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  const targetCss = cssFiles.find(f => f.includes('index')) || cssFiles[0];
  if (!targetCss) return;

  const directive = (version === 'latest' || version === '4.1')
    ? '@import "tailwindcss";'
    : ['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n');

  fs.writeFileSync(path.join(cssDir, targetCss), `${directive}\n`, 'utf-8');
  logger.success(`✅ Directivas Tailwind insertadas en ${targetCss}`);
}


