"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitOperator = void 0;
const exec_1 = require("../../../utils/exec");
/**
 * Clase encargada de operar acciones Git y de repositorios remotos.
 * Implementa la interfaz GitOps y utiliza un cliente GitHub para interactuar con la plataforma.
 * Permite crear, clonar, inicializar repositorios, gestionar remotos y realizar push, entre otras operaciones.
 */
class GitOperator {
    /**
     * Crea una instancia de GitOperator.
     * @param client Instancia de GitHubClient utilizada para interactuar con GitHub.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Crea un nuevo repositorio remoto en GitHub utilizando la configuración proporcionada.
     * @param config Objeto de configuración con datos del usuario y del repositorio.
     * @returns Información del repositorio creado.
     * @throws Si faltan datos necesarios o el token es inválido.
     */
    async createRepo(config) {
        if (!config.gitConfig || !config.repoCreation) {
            throw new Error("Faltan datos para crear el repositorio");
        }
        const { token } = config.gitConfig;
        if (!token)
            throw new Error("Token es obligatorio para crear el repositorio");
        this.client.setToken(token);
        const isValid = await this.client.validateToken();
        if (!isValid)
            throw new Error("Token inválido");
        return this.client.createRepository(config.repoCreation);
    }
    /**
     * Clona un repositorio remoto en la ruta destino especificada.
     * @param urlRepo URL del repositorio remoto a clonar.
     * @param pathDestino Ruta local donde se clonará el repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si faltan parámetros o ocurre un error durante el clonado.
     */
    async cloneRepo(urlRepo, pathDestino, verbose) {
        if (!urlRepo || !pathDestino) {
            throw new Error("URL y path son obligatorios para clonar");
        }
        try {
            const command = `git clone ${urlRepo} ${pathDestino}`;
            await (0, exec_1.execCommand)(command, { verbose: verbose });
        }
        catch (error) {
            throw new Error(`Error al clonar el repositorio: ${error.message || error}`);
        }
    }
    /**
     * Inicializa un nuevo repositorio Git en la ruta especificada.
     * @param pathDestino Ruta local donde se inicializará el repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación (por defecto: true).
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si la ruta destino está vacía o ocurre un error durante la inicialización.
     */
    async initRepo(pathDestino, verbose = true) {
        if (!pathDestino) {
            throw new Error("El path destino no puede estar vacío.");
        }
        try {
            const command = `git init`;
            await (0, exec_1.execCommand)(command, { cwd: pathDestino, verbose });
        }
        catch (error) {
            throw new Error(`Error al inicializar el repositorio git: ${error.message || error}`);
        }
    }
    /**
     * Agrega un remoto llamado 'origin' al repositorio local.
     * @param repoURL URL del repositorio remoto.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si faltan parámetros o ocurre un error al agregar el remoto.
     */
    async addRemote(repoURL, path, verbose) {
        if (!repoURL || !path) {
            throw new Error("URL y path son obligatorios.");
        }
        try {
            const command = `git remote add origin ${repoURL}`;
            await (0, exec_1.execCommand)(command, { cwd: path, verbose });
        }
        catch (error) {
            throw new Error(`Error al inicializar el repositorio git: ${error.message || error}`);
        }
    }
    /**
     * Elimina el remoto especificado si existe en el repositorio local.
     * @param remoteName Nombre del remoto a eliminar.
     * @param path Ruta local del repositorio.
     * @param verbose Indica si se debe mostrar información detallada de la operación.
     * @returns Promesa que se resuelve cuando la operación finaliza.
     */
    async removeRemoteIfExists(remoteName, path, verbose) {
        try {
            await (0, exec_1.execCommand)(`git remote get-url ${remoteName}`, { cwd: path, verbose: false });
            if (verbose) {
                console.log(`Remote ${remoteName} existe, eliminando...`);
            }
            await (0, exec_1.execCommand)(`git remote remove ${remoteName}`, { cwd: path, verbose });
        }
        catch {
            if (verbose) {
                console.log(`Remote ${remoteName} no existe, no se elimina.`);
            }
        }
    }
    /**
     * Realiza un git add y un commit en el repositorio local.
     * @param pathDestino Ruta local del repositorio donde se ejecutarán los comandos.
     * @param message Mensaje que se usará para el commit (por defecto: 'Initial commit').
     * @param verbose Indica si se debe mostrar información detallada durante la ejecución (por defecto: true).
     * @throws Error si ocurre algún problema al ejecutar los comandos git.
     */
    async gitAddAndCommit(pathDestino, message = 'Initial commit', verbose = true) {
        try {
            await (0, exec_1.execCommand)(`git add .`);
            await (0, exec_1.execCommand)(`git commit -m "${message}"`, { cwd: pathDestino, verbose });
        }
        catch (error) {
            throw new Error(`Error al hacer git push: ${error.message || error}`);
        }
    }
    /**
     * Realiza un commit y un push del repositorio local al remoto en la rama especificada.
     * @param pathDestino Ruta local del repositorio.
     * @param branch Nombre de la rama a la que se hará push (por defecto: 'main').
     * @param message Mensaje del commit (por defecto: 'Initial commit').
     * @param verbose Indica si se debe mostrar información detallada de la operación (por defecto: true).
     * @returns Promesa que se resuelve cuando la operación finaliza.
     * @throws Si la ruta destino está vacía o ocurre un error durante el push.
     */
    async gitPush(pathDestino, branch = 'main', message = 'Initial commit', verbose = true) {
        if (!pathDestino) {
            throw new Error("El path destino no puede estar vacío.");
        }
        try {
            const command = `git push -u origin ${branch}`;
            await this.gitAddAndCommit(pathDestino, message, verbose);
            await (0, exec_1.execCommand)(command, { cwd: pathDestino, verbose });
        }
        catch (error) {
            throw new Error(`Error al hacer git push: ${error.message || error}`);
        }
    }
}
exports.GitOperator = GitOperator;
