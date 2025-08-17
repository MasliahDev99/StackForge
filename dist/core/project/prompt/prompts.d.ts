import { UserAnswers } from '../../../types/UserAnswer';
/**
 * Función principal que coordina los prompts para la configuración completa del proyecto.
 * Incluye configuración opcional de GitHub, configuración general del proyecto,
 * TailwindCSS, dependencias adicionales y estructura de carpetas.
 *
 * @returns {Promise<UserAnswers | null>} Un objeto con las respuestas del usuario o null si se cancela.
 */
export declare function promptUser(): Promise<UserAnswers | null>;
/**
 * Solicita al usuario la configuración general básica del proyecto.
 * Incluye gestor de paquetes, nombre del proyecto y package,
 * bundler y lenguaje a utilizar.
 *
 * @returns {Promise<Pick<UserAnswers, 'projectName' | 'packageName' | 'bundler' | 'language' | 'packageManager'> | null>}
 * Objeto parcial con la configuración general o null si se cancela.
 */
export declare function promptGeneralProjectConfig(): Promise<Pick<UserAnswers, 'projectName' | 'packageName' | 'bundler' | 'language' | 'packageManager'> | null>;
/**
 * Solicita al usuario si desea instalar TailwindCSS y en caso afirmativo,
 * le pregunta la versión deseada.
 *
 * @returns {Promise<Pick<UserAnswers, 'useTailwind' | 'tailwindVersion'> | { useTailwind: boolean } | null>}
 * Objeto parcial con la configuración Tailwind o null si se cancela.
 */
export declare function promptTailwindConfig(): Promise<Pick<UserAnswers, 'useTailwind' | 'tailwindVersion'> | {
    useTailwind: boolean;
} | null>;
/**
 * Consulta al usuario si desea instalar dependencias adicionales,
 * y en caso afirmativo, le solicita la lista separada por espacios.
 *
 * @returns {Promise<Pick<UserAnswers, 'installDeps' | 'depsList'> | { installDeps: boolean } | null>}
 * Objeto parcial con la configuración de dependencias o null si se cancela.
 */
export declare function promptDepsConfig(): Promise<Pick<UserAnswers, 'installDeps' | 'depsList'> | {
    installDeps: boolean;
} | null>;
/**
 * Pregunta al usuario si desea crear una estructura de carpetas dentro de src,
 * y en caso afirmativo, le solicita la estructura deseada.
 *
 * @returns {Promise<Pick<UserAnswers, 'createFolders' | 'folderStructure'> | { createFolders: boolean } | null>}
 * Objeto parcial con la configuración de carpetas o null si se cancela.
 */
export declare function promptFolderStructureConfig(): Promise<Pick<UserAnswers, 'createFolders' | 'folderStructure'> | {
    createFolders: boolean;
} | null>;
//# sourceMappingURL=prompts.d.ts.map