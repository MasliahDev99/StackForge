/**
 *  alias - Soporte de paths
 *  
 *  Responsable de:
 *  
 *  - Configurar alias en tsconfig.json (@components, @utils, etc.)
 *  
 */

import fs from 'fs'
import path from 'path';
import { UserAnswers } from '../types';
import { logger } from '../utils/logger';


export async function setupAliases({ bundler, language }: UserAnswers) {
  const isTS = language.includes('TypeScript');

  try {
    if (isTS) {
      updateTsconfigAlias();
    }

    if (bundler === 'Vite') {
      updateViteAlias();
    }


    if (bundler === 'Ninguno' && !isTS) {
      logger.warn('Alias no configurado en proyectos JS sin bundler.');
    }
  } catch (err) {
    logger.error(`Error al configurar alias: ${(err as Error).message}`);
  }
}

function updateTsconfigAlias() {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    logger.warn('tsconfig.json no encontrado, se omite configuración de alias.');
    return;
  }

  const raw = fs.readFileSync(tsconfigPath, 'utf-8');
  const json = JSON.parse(raw);

  json.compilerOptions = json.compilerOptions || {};
  json.compilerOptions.baseUrl = 'src';
  json.compilerOptions.paths = {
    ...(json.compilerOptions.paths || {}),
    '@/*': ['*']
  };

  fs.writeFileSync(tsconfigPath, JSON.stringify(json, null, 2));
  logger.success('Alias configurado en tsconfig.json');
}

function updateViteAlias() {
  const viteConfigTS = path.join(process.cwd(), 'vite.config.ts');
  const viteConfigJS = path.join(process.cwd(), 'vite.config.js');

  const viteConfigFile = fs.existsSync(viteConfigTS)
    ? viteConfigTS
    : fs.existsSync(viteConfigJS)
    ? viteConfigJS
    : null;

  if (!viteConfigFile) {
    logger.warn('vite.config no encontrado (.ts o .js), se omite configuración de alias.');
    return;
  }

  const viteConfigRaw = fs.readFileSync(viteConfigFile, 'utf-8');

  if (viteConfigRaw.includes("alias:")) {
    logger.info('Alias ya configurado en vite.config, se omite.');
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

  fs.writeFileSync(viteConfigFile, updated);
  logger.success(`Alias configurado en ${path.basename(viteConfigFile)}`);
}