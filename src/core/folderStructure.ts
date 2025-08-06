/**
 *  folderStructure -  Creador de carpetas
 * 
 *  Responsable de:
 *  
 *  - Crear estructura si createFolders === true
 *  - Validar rutas, crear subdirectorios (src/components, pages, etc.)
 * 
 * 
 */

import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

export function createFolderStructure({ folderStructure }: { folderStructure?: string }) {
  const srcPath = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
    logger.success('📁 Carpeta raíz creada: src');
  }

  if (!folderStructure || !folderStructure.trim()) {
    logger.warn('No se especificó estructura de carpetas.');
    return;
  }

  const entries = folderStructure
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  entries.forEach(entry => {
    const hasChildren = entry.includes('[') && entry.includes(']');
    if (!hasChildren) {
      // Solo carpeta simple dentro de src
      const dirPath = path.join(process.cwd(), 'src', entry);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        logger.success(`📁 Carpeta creada: ${entry}`);
      } else {
        logger.info(`📁 Ya existe: ${entry}`);
      }
    } else {
      // carpeta con hijos entre corchetes
      const [parentRaw = '', childrenRaw = ''] = entry.split('[');
      const parent = parentRaw.trim();
      const children = childrenRaw.replace(']', '').split(',').map(c => c.trim()).filter(Boolean);

      const parentPath = path.join(process.cwd(), 'src', parent);
      if (!fs.existsSync(parentPath)) {
        fs.mkdirSync(parentPath, { recursive: true });
        logger.success(`📁 Carpeta creada: ${parent}`);
      }

      children.forEach(child => {
        const isFile = child.includes('.');
        const childPath = path.join(parentPath, child);
        if (isFile) {
          if (!fs.existsSync(childPath)) {
            fs.writeFileSync(childPath, '');
            logger.success(`📝 Archivo creado: ${path.join(parent, child)}`);
          }
        } else {
          if (!fs.existsSync(childPath)) {
            fs.mkdirSync(childPath, { recursive: true });
            logger.success(`📁 Subcarpeta creada: ${path.join(parent, child)}`);
          }
        }
      });
    }
  });
}