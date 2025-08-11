"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitOperator = void 0;
class GitOperator {
    constructor(client) {
        this.client = client;
    }
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
        // Aquí pasamos directamente repoCreation que es RepoCreationConfig
        return await this.client.createRepository(config.repoCreation);
    }
    async cloneRepo(url, path) {
        if (!url || !path) {
            throw new Error("URL y path son obligatorios para clonar");
        }
        return this.client.cloneRepository(url, path, true);
    }
    async initRepo(path, verbose) {
        return await this.client.gitInit(path, verbose);
    }
    async addRemote(repoURL, path, verbose) {
        return await this.client.addRemote(repoURL, path, verbose);
    }
    async removeRemoteIfExists(remoteName, path, verbose) {
        return await this.client.removeRemoteIfExists(remoteName, path, verbose);
    }
    async gitPush(path, branch, message = 'Initial commit', verbose) {
        return await this.client.gitPush(path, branch, message, verbose);
    }
}
exports.GitOperator = GitOperator;
//# sourceMappingURL=gitOperators.js.map