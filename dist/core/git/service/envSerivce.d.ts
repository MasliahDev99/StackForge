/**
 * Módulo para la gestión de la configuración de GitHub mediante variables de entorno.
 * Permite establecer, obtener y validar la configuración relacionada con GitHub
 * almacenada en el archivo `.env` y en las variables de entorno en tiempo de ejecución.
 */
/**
 * Establece la configuración de GitHub actualizando el archivo `.env` y las variables de entorno en tiempo de ejecución.
 *
 * @param {Object} params - Objeto con los parámetros necesarios para la configuración.
 * @param {string} params.token - Token de autenticación de GitHub.
 * @param {string} params.userName - Nombre de usuario de GitHub.
 */
export declare function setGitHubConfig({ token, userName }: {
    token: string;
    userName: string;
}): Promise<void>;
/**
 * Obtiene la configuración actual de GitHub desde las variables de entorno o el archivo `.env`.
 *
 * @returns {Object} Objeto con el token y nombre de usuario de GitHub, si están definidos.
 * @returns {string | undefined} [token] - Token de autenticación de GitHub.
 * @returns {string | undefined} [userName] - Nombre de usuario de GitHub.
 */
export declare function getGitHubConfig(): {
    token?: string | undefined;
    userName?: string | undefined;
};
/**
 * Verifica si la sesión de GitHub es válida comprobando que existan el token y el nombre de usuario en las variables de entorno.
 *
 * @returns {boolean} `true` si ambos valores están definidos, `false` en caso contrario.
 */
export declare function isGitHubSessionValid(): boolean;
