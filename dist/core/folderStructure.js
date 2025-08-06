"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderStructure = createFolderStructure;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
function createFolderStructure({ folderStructure }) {
    const srcPath = path_1.default.join(process.cwd(), 'src');
    if (!fs_1.default.existsSync(srcPath)) {
        fs_1.default.mkdirSync(srcPath, { recursive: true });
        logger_1.logger.success('📁 Carpeta raíz creada: src');
    }
    if (!folderStructure || !folderStructure.trim()) {
        logger_1.logger.warn('No se especificó estructura de carpetas.');
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
            const dirPath = path_1.default.join(process.cwd(), 'src', entry);
            if (!fs_1.default.existsSync(dirPath)) {
                fs_1.default.mkdirSync(dirPath, { recursive: true });
                logger_1.logger.success(`📁 Carpeta creada: ${entry}`);
            }
            else {
                logger_1.logger.info(`📁 Ya existe: ${entry}`);
            }
        }
        else {
            // carpeta con hijos entre corchetes
            const [parentRaw = '', childrenRaw = ''] = entry.split('[');
            const parent = parentRaw.trim();
            const children = childrenRaw.replace(']', '').split(',').map(c => c.trim()).filter(Boolean);
            const parentPath = path_1.default.join(process.cwd(), 'src', parent);
            if (!fs_1.default.existsSync(parentPath)) {
                fs_1.default.mkdirSync(parentPath, { recursive: true });
                logger_1.logger.success(`📁 Carpeta creada: ${parent}`);
            }
            children.forEach(child => {
                const isFile = child.includes('.');
                const childPath = path_1.default.join(parentPath, child);
                if (isFile) {
                    if (!fs_1.default.existsSync(childPath)) {
                        fs_1.default.writeFileSync(childPath, '');
                        logger_1.logger.success(`📝 Archivo creado: ${path_1.default.join(parent, child)}`);
                    }
                }
                else {
                    if (!fs_1.default.existsSync(childPath)) {
                        fs_1.default.mkdirSync(childPath, { recursive: true });
                        logger_1.logger.success(`📁 Subcarpeta creada: ${path_1.default.join(parent, child)}`);
                    }
                }
            });
        }
    });
}
//# sourceMappingURL=folderStructure.js.map