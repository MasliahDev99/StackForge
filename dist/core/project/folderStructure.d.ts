/**
 * folderStructure - Generador de estructura de carpetas y archivos
 *
 * Sintaxis soportada:
 * - "/" → Subcarpeta (nivel de profundidad)
 * - "{}" → Archivos en el path actual
 * - "[]" → Agrupación de rutas y archivos al mismo nivel
 * - "," → Separación de elementos hermanos
 */
import { IProjectStep } from './domain/iProjectStep';
import { UserAnswers } from '../../types/UserAnswer';
import { createFolderStructure } from './setup/createFolder';
export declare class FolderStructureCreator implements IProjectStep {
    execute(config: UserAnswers): Promise<void>;
}
export { createFolderStructure };
