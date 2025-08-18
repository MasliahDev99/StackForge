import { UserAnswers } from "../../../types/UserAnswer";
import { RepoInfo } from "../domain/repoInfo";
/**
 * Clase que proporciona una interfaz de alto nivel para interactuar con repositorios Git y GitHub.
 * Permite crear, clonar, inicializar repositorios, gestionar remotos y realizar operaciones de push,
 * así como validar y gestionar el token de autenticación.
 */
export declare class GitService {
    private client;
    private operator;
    /**
     * Inicializa una nueva instancia de la clase GitService.
     * @param token Token de autenticación de GitHub (opcional).
     */
    constructor(token?: string);
    /**
     * Crea un nuevo repositorio en GitHub según la configuración proporcionada.
     * @param config Objeto de configuración con los datos del repositorio.
     * @returns Información del repositorio creado.
     */
    createRepository(config: UserAnswers): Promise<RepoInfo>;
    /**
     * Clona un repositorio remoto en una ruta local especificada.
     * @param url URL del repositorio remoto.
     * @param path Ruta local donde se clonará el repositorio.
     * @param verbose Indica si se debe mostrar información detallada del proceso.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    cloneRepository(url: string, path: string, verbose: boolean): Promise<void>;
    /**
     * Inicializa un nuevo repositorio Git en la ruta especificada.
     * @param path Ruta local donde se inicializará el repositorio.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    initRepository(path: string): Promise<void>;
    /**
     * Elimina un remoto de un repositorio local si existe.
     * @param remoteName Nombre del remoto a eliminar.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada del proceso.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
    /**
     * Valida el token de autenticación de GitHub para comprobar su validez.
     * @returns Promesa que se resuelve con el resultado de la validación.
     */
    validateToken(): Promise<boolean>;
    /**
     * Agrega un remoto a un repositorio local.
     * @param repoURL URL del repositorio remoto.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada del proceso.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    addRemote(repoURL: string, path: string, verbose: boolean): Promise<void>;
    /**
     * Realiza un push de los cambios locales a un repositorio remoto.
     * @param pathDestino Ruta local del repositorio.
     * @param branch Nombre de la rama a la que se realizará el push (por defecto 'main').
     * @param message Mensaje del commit (por defecto 'Initial commit').
     * @param verbose Indica si se debe mostrar información detallada del proceso (por defecto true).
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    gitPush(pathDestino: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
    /**
     * Establece el token de autenticación para las operaciones de GitHub.
     * @param token Token de autenticación de GitHub.
     */
    setToken(token: string): void;
    /**
     * Obtiene el token de autenticación actualmente utilizado.
     * @returns El token de autenticación de GitHub.
     */
    getToken(): string;
    /**
     * Obtiene el nombre de usuario de GitHub asociado al token actual.
     * @returns Promesa que se resuelve con el nombre de usuario.
     */
    getUserName(): Promise<string>;
}
