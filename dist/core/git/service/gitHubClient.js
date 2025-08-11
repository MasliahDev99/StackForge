"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const rest_1 = require("@octokit/rest");
const exec_1 = require("../../../utils/exec");
/**
 *   GitHubClient - Encargado la comunicacion con Github y validacion del token de authenticacion
 */
class GitHubClient {
    constructor(token) {
        this.token = token;
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    setToken(token) {
        this.token = token;
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    getToken() {
        return this.token;
    }
    async validateToken() {
        try {
            await this.octokit.rest.users.getAuthenticated();
            return true;
        }
        catch {
            return false;
        }
    }
    async getUserNameByToken() {
        try {
            const { data: user } = await this.octokit.rest.users.getAuthenticated();
            return user.login;
        }
        catch (error) {
            throw new Error('No se pudo obtener el nombre de usuario autenticado.');
        }
    }
    /**
     *
     *
     */
    async createRepository(params) {
        const response = await this.octokit.rest.repos.createForAuthenticatedUser({
            name: params.name,
            description: params.description,
            private: params.repoVisibility === "Private",
            auto_init: false, // si esta en true crea repositorio con real
            default_branch: params.defaultBranch,
        });
        return {
            url: response.data.clone_url,
            name: response.data.name,
            defaultBranch: response.data.default_branch || params.defaultBranch || "main",
        };
    }
    async cloneRepository(urlRepo, pathDestino, verbose) {
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
    async gitInit(pathDestino, verbose = true) {
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
    async gitPush(pathDestino, branch = 'main', message = 'Initial commit', verbose = true) {
        if (!pathDestino) {
            throw new Error("El path destino no puede estar vacío.");
        }
        try {
            const command = `git push -u origin ${branch}`;
            await (0, exec_1.execCommand)(`git add .`);
            await (0, exec_1.execCommand)(`git commit -m "${message}"`, { cwd: pathDestino, verbose });
            await (0, exec_1.execCommand)(command, { cwd: pathDestino, verbose });
        }
        catch (error) {
            throw new Error(`Error al hacer git push: ${error.message || error}`);
        }
    }
}
exports.GitHubClient = GitHubClient;
//# sourceMappingURL=gitHubClient.js.map