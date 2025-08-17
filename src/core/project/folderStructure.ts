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



export class FolderStructureCreator implements IProjectStep {
  async execute(config: UserAnswers): Promise<void> {
    if(!config.folderStructure) return
    await createFolderStructure({folderStructure: config.folderStructure})
    
  }
}


export { createFolderStructure };

