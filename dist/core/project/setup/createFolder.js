"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderStructure = createFolderStructure;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../../../utils/logger");
async function createFolderStructure({ folderStructure }) {
    const srcPath = path_1.default.join(process.cwd(), 'src');
    ensureDirectoryExists(srcPath, '📁 Carpeta raíz creada: src');
    if (!folderStructure || !folderStructure.trim()) {
        logger_1.logger.warn('No se especificó estructura de carpetas.');
        return;
    }
    const entries = parseComplexStructureString(folderStructure);
    for (const { parent, children } of entries) {
        const parentPath = path_1.default.join(srcPath, parent);
        ensureDirectoryExists(parentPath, `📁 Carpeta creada: ${parentPath}`);
        for (const child of children) {
            const isFile = child.includes('.');
            const childPath = path_1.default.join(parentPath, child);
            if (isFile) {
                createFileIfNotExists(childPath);
            }
            else {
                ensureDirectoryExists(childPath, `📁 Subcarpeta creada: ${childPath}`);
            }
        }
    }
}
function parseComplexStructureString(input) {
    const entries = [];
    const flush = (pathStack, files) => {
        if (pathStack.length === 0)
            return;
        const parent = pathStack.join('/');
        entries.push({ parent, children: files });
    };
    const walk = (str, parentStack = []) => {
        let i = 0;
        let temp = '';
        const pushTempAsFolder = () => {
            const clean = temp.trim();
            if (clean)
                parentStack.push(clean);
            temp = '';
        };
        while (i < str.length) {
            const char = str[i];
            if (char === '/') {
                pushTempAsFolder();
            }
            else if (char === '[') {
                const closeIdx = findClosing(str, i, '[', ']');
                const content = str.slice(i + 1, closeIdx);
                walk(content, parentStack);
                i = closeIdx;
            }
            else if (char === '{') {
                pushTempAsFolder();
                const closeIdx = findClosing(str, i, '{', '}');
                const content = str.slice(i + 1, closeIdx);
                const files = content.split(',').map(f => f.trim()).filter(Boolean);
                flush(parentStack, files);
                i = closeIdx;
            }
            else if (char === ',') {
                pushTempAsFolder();
                flush(parentStack, []);
                parentStack.pop();
            }
            else {
                temp += char;
            }
            i++;
        }
        pushTempAsFolder();
        flush(parentStack, []);
        parentStack.pop();
    };
    const findClosing = (str, start, open, close) => {
        let depth = 0;
        for (let i = start; i < str.length; i++) {
            if (str[i] === open)
                depth++;
            else if (str[i] === close) {
                depth--;
                if (depth === 0)
                    return i;
            }
        }
        throw new Error(`No se encontró cierre para ${open} iniciado en posición ${start}`);
    };
    walk(input);
    return entries;
}
function ensureDirectoryExists(dirPath, successMessage) {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
        logger_1.logger.success(successMessage || `📁 Carpeta creada: ${dirPath}`);
    }
}
function createFileIfNotExists(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, '');
        logger_1.logger.success(`📝 Archivo creado: ${filePath}`);
    }
}
//# sourceMappingURL=createFolder.js.map