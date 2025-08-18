"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const rest_1 = require("@octokit/rest");
/**
 * GitHubClient - Gestiona la comunicación con GitHub y la validación del token de autenticación.
 * Proporciona métodos para validar el token, obtener información del usuario autenticado y crear repositorios.
 */
class GitHubClient {
    /**
     * Crea una instancia de GitHubClient con el token de autenticación proporcionado.
     * @param token - Token de autenticación para acceder a la API de GitHub.
     */
    constructor(token) {
        this.token = token;
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    /**
     * Establece un nuevo token de autenticación y actualiza el cliente Octokit.
     * @param token - Nuevo token de autenticación para la API de GitHub.
     */
    setToken(token) {
        this.token = token;
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    /**
     * Obtiene el token de autenticación actualmente configurado.
     * @returns El token de autenticación como cadena de texto.
     */
    getToken() {
        return this.token;
    }
    /**
     * Valida si el token de autenticación es válido realizando una llamada a la API de GitHub.
     * @returns `true` si el token es válido; de lo contrario, `false`.
     */
    async validateToken() {
        try {
            await this.octokit.rest.users.getAuthenticated();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Obtiene el nombre de usuario asociado al token de autenticación.
     * @returns El nombre de usuario autenticado.
     * @throws Error si no se puede obtener el nombre de usuario autenticado.
     */
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
     * Crea un nuevo repositorio en GitHub para el usuario autenticado con la configuración especificada.
     * @param params - Configuración para la creación del repositorio.
     * @returns Un objeto con la información del repositorio creado, incluyendo URL, nombre y rama por defecto.
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
}
exports.GitHubClient = GitHubClient;
