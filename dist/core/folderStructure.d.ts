/**
 * folderStructure - Generador de estructura de carpetas y archivos
 *
 * Sintaxis soportada:
 * - "/" → Subcarpeta (nivel de profundidad)
 * - "{}" → Archivos en el path actual
 * - "[]" → Agrupación de rutas y archivos al mismo nivel
 * - "," → Separación de elementos hermanos
 */
type FolderStructureConfig = {
    folderStructure?: string;
};
export declare function createFolderStructure({ folderStructure }: FolderStructureConfig): Promise<void>;
export {};
//# sourceMappingURL=folderStructure.d.ts.map