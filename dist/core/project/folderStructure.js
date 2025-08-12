"use strict";
/**
 * folderStructure - Generador de estructura de carpetas y archivos
 *
 * Sintaxis soportada:
 * - "/" → Subcarpeta (nivel de profundidad)
 * - "{}" → Archivos en el path actual
 * - "[]" → Agrupación de rutas y archivos al mismo nivel
 * - "," → Separación de elementos hermanos
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderStructure = exports.FolderStructureCreator = void 0;
const createFolder_1 = require("./setup/createFolder");
Object.defineProperty(exports, "createFolderStructure", { enumerable: true, get: function () { return createFolder_1.createFolderStructure; } });
class FolderStructureCreator {
    async execute(config) {
        if (!config.folderStructure)
            return;
        await (0, createFolder_1.createFolderStructure)({ folderStructure: config.folderStructure });
    }
}
exports.FolderStructureCreator = FolderStructureCreator;
//# sourceMappingURL=folderStructure.js.map