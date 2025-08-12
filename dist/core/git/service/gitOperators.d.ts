import { GitOps } from "../domain/gitOps";
import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
import { GitHubClient } from "./gitHubClient";
/**
 * Clase encargada de operar acciones Git y de repositorios remotos.
 * Implementa la interfaz GitOps y utiliza un cliente GitHub para interactuar con la plataforma.
 * Permite crear, clonar, inicializar repositorios, gestionar remotos y realizar push, entre otras operaciones.
 */
export declare class GitOperator implements GitOps {
    private client;
    /**
     * Crea una instancia de GitOperator.
     * @param client Instancia de GitHubClient utilizada para interactuar con GitHub.
     */
    constructor(client: GitHubClient);
    /**
     * Crea un nuevo repositorio remoto en GitHub utilizando la configuración proporcionada.
     * @param config Objeto de configuración con datos del usuario y del repositorio.
     * @returns Información del repositorio creado.
     * @throws Si faltan datos necesarios o el token es inválido.
     */
    createRepo(config: UserAnswers): Promise<RepoInfo>;
    /**
     * Clona un repositorio remoto en la ruta destino especificada.
     * @param urlRepo URL del repositorio remoto a clonar.
     * @param pathDestino Ruta local donde se clonará el repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si faltan parámetros o ocurre un error durante el clonado.
     */
    cloneRepo(urlRepo: string, pathDestino: string, verbose: boolean): Promise<void>;
    /**
     * Inicializa un nuevo repositorio Git en la ruta especificada.
     * @param pathDestino Ruta local donde se inicializará el repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación (por defecto: true).
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si la ruta destino está vacía o ocurre un error durante la inicialización.
     */
    initRepo(pathDestino: string, verbose?: boolean): Promise<void>;
    /**
     * Agrega un remoto llamado 'origin' al repositorio local.
     * @param repoURL URL del repositorio remoto.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si faltan parámetros o ocurre un error al agregar el remoto.
     */
    addRemote(repoURL: string, path: string, verbose: boolean): Promise<void>;
    /**
     * Elimina el remoto especificado si existe en el repositorio local.
     * @param remoteName Nombre del remoto a eliminar.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
    /**
     * Realiza un git add y un commit en el repositorio local.
     * @param pathDestino Ruta local del repositorio donde se ejecutarán los comandos.
     * @param message Mensaje que se usará para el commit (por defecto: 'Initial commit').
     * @param verbose Indica si se debe mostrar información detallada durante la ejecución (por defecto: true).
     * @throws Error si ocurre algún problema al ejecutar los comandos git.
     */
    private gitAddAndCommit;
    /**
     * Realiza un commit y un push del repositorio local al remoto en la rama especificada.
     * @param pathDestino Ruta local del repositorio.
     * @param branch Nombre de la rama a la que se hará push (por defecto: 'main').
     * @param message Mensaje del commit (por defecto: 'Initial commit').
     * @param verbose Indica si se debe mostrar información detallada de la operación (por defecto: true).
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si la ruta destino está vacía o ocurre un error durante el push.
     */
    gitPush(pathDestino: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
}
//# sourceMappingURL=gitOperators.d.ts.map