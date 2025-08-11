"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitService = void 0;
const gitHubClient_1 = require("./gitHubClient");
const gitOperators_1 = require("./gitOperators");
class GitService {
    constructor(token) {
        this.client = new gitHubClient_1.GitHubClient(token || '');
        this.operator = new gitOperators_1.GitOperator(this.client);
    }
    async createRepository(config) {
        return await this.operator.createRepo(config);
    }
    async cloneRepository(url, path) {
        return await this.operator.cloneRepo(url, path);
    }
    async initRepository(path) {
        return await this.operator.initRepo(path, true);
    }
    async removeRemoteIfExists(remoteName, path, verbose) {
        return await this.operator.removeRemoteIfExists(remoteName, path, verbose);
    }
    async validateToken() {
        return await this.client.validateToken();
    }
    async addRemote(repoURL, path, verbose) {
        return await this.client.addRemote(repoURL, path, verbose);
    }
    async gitPush(pathDestino, branch = 'main', message = 'Initial commit', verbose = true) {
        return await this.operator.gitPush(pathDestino, branch, message, verbose);
    }
    setToken(token) {
        this.client.setToken(token);
    }
    getToken() {
        return this.client.getToken();
    }
    async getUserName() {
        return await this.client.getUserNameByToken();
    }
}
exports.GitService = GitService;
//# sourceMappingURL=gitService.js.map