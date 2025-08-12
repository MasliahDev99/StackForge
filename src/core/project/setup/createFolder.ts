import fs from 'fs'
import path from 'path';
import { logger } from '../../../utils/logger';
import { FolderStructureConfig } from '../domain/folderStructureConfig';

export async function createFolderStructure({ folderStructure }: FolderStructureConfig) {
  const srcPath = path.join(process.cwd(), 'src');
  ensureDirectoryExists(srcPath, '📁 Carpeta raíz creada: src');

  if (!folderStructure || !folderStructure.trim()) {
    logger.warn('No se especificó estructura de carpetas.');
    return;
  }

  const entries = parseComplexStructureString(folderStructure);

  for (const { parent, children } of entries) {
    const parentPath = path.join(srcPath, parent);
    ensureDirectoryExists(parentPath, `📁 Carpeta creada: ${parentPath}`);

    for (const child of children) {
      const isFile = child.includes('.');
      const childPath = path.join(parentPath, child);
      if (isFile) {
        createFileIfNotExists(childPath);
      } else {
        ensureDirectoryExists(childPath, `📁 Subcarpeta creada: ${childPath}`);
      }
    }
  }
}

type ParsedEntry = {
  parent: string;
  children: string[];
};

function parseComplexStructureString(input: string): ParsedEntry[] {
  const entries: ParsedEntry[] = [];

  const flush = (pathStack: string[], files: string[]) => {
    if (pathStack.length === 0) return;
    const parent = pathStack.join('/');
    entries.push({ parent, children: files });
  };

  const walk = (str: string, parentStack: string[] = []) => {
    let i = 0;
    let temp = '';

    const pushTempAsFolder = () => {
      const clean = temp.trim();
      if (clean) parentStack.push(clean);
      temp = '';
    };

    while (i < str.length) {
      const char = str[i];

      if (char === '/') {
        pushTempAsFolder();
      } else if (char === '[') {
        const closeIdx = findClosing(str, i, '[', ']');
        const content = str.slice(i + 1, closeIdx);
        walk(content, parentStack);
        i = closeIdx;
      } else if (char === '{') {
        pushTempAsFolder();
        const closeIdx = findClosing(str, i, '{', '}');
        const content = str.slice(i + 1, closeIdx);
        const files = content.split(',').map(f => f.trim()).filter(Boolean);
        flush(parentStack, files);
        i = closeIdx;
      } else if (char === ',') {
        pushTempAsFolder();
        flush(parentStack, []);
        parentStack.pop();
      } else {
        temp += char;
      }
      i++;
    }

    pushTempAsFolder();
    flush(parentStack, []);
    parentStack.pop();
  };

  const findClosing = (str: string, start: number, open: string, close: string): number => {
    let depth = 0;
    for (let i = start; i < str.length; i++) {
      if (str[i] === open) depth++;
      else if (str[i] === close) {
        depth--;
        if (depth === 0) return i;
      }
    }
    throw new Error(`No se encontró cierre para ${open} iniciado en posición ${start}`);
  };

  walk(input);
  return entries;
}

function ensureDirectoryExists(dirPath: string, successMessage?: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger.success(successMessage || `📁 Carpeta creada: ${dirPath}`);
  }
}

function createFileIfNotExists(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    logger.success(`📝 Archivo creado: ${filePath}`);
  } 
}