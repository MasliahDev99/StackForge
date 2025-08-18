import { RepoInfo } from "../domain/repoInfo";
import { RepoCreationConfig } from "../domain/repoConfig";
/**
 * GitHubClient - Gestiona la comunicación con GitHub y la validación del token de autenticación.
 * Proporciona métodos para validar el token, obtener información del usuario autenticado y crear repositorios.
 */
export declare class GitHubClient {
    private octokit;
    private token;
    /**
     * Crea una instancia de GitHubClient con el token de autenticación proporcionado.
     * @param token - Token de autenticación para acceder a la API de GitHub.
     */
    constructor(token: string);
    /**
     * Establece un nuevo token de autenticación y actualiza el cliente Octokit.
     * @param token - Nuevo token de autenticación para la API de GitHub.
     */
    setToken(token: string): void;
    /**
     * Obtiene el token de autenticación actualmente configurado.
     * @returns El token de autenticación como cadena de texto.
     */
    getToken(): string;
    /**
     * Valida si el token de autenticación es válido realizando una llamada a la API de GitHub.
     * @returns `true` si el token es válido; de lo contrario, `false`.
     */
    validateToken(): Promise<boolean>;
    /**
     * Obtiene el nombre de usuario asociado al token de autenticación.
     * @returns El nombre de usuario autenticado.
     * @throws Error si no se puede obtener el nombre de usuario autenticado.
     */
    getUserNameByToken(): Promise<string>;
    /**
     * Crea un nuevo repositorio en GitHub para el usuario autenticado con la configuración especificada.
     * @param params - Configuración para la creación del repositorio.
     * @returns Un objeto con la información del repositorio creado, incluyendo URL, nombre y rama por defecto.
     */
    createRepository(params: RepoCreationConfig): Promise<RepoInfo>;
}
