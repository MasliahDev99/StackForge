"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitPrompt = void 0;
/**
 * gitPrompt - Encargado de los pasos para configurar git
 *
 *
 */
const prompts_1 = require("@clack/prompts");
const envSerivce_1 = require("../../core/git/service/envSerivce");
class GitPrompt {
    constructor(service) { this.gitService = service; }
    async promptGitConfigSimple() {
        const token = await (0, prompts_1.text)({
            message: '🔑 Ingresá tu token de acceso personal de GitHub (PAT):',
            validate: val => val.length > 0 ? undefined : 'El token no puede estar vacío',
        });
        if ((0, prompts_1.isCancel)(token))
            throw new Error('⛔ Operación cancelada por el usuario.');
        const userName = await (0, prompts_1.text)({
            message: '👤 Ingresá tu nombre de usuario Git (user.name):',
            validate: val => val.trim().length > 0 ? undefined : 'El nombre de usuario no puede estar vacío',
        });
        if ((0, prompts_1.isCancel)(userName))
            throw new Error('⛔ Operación cancelada por el usuario.');
        const email = await (0, prompts_1.text)({
            message: '📧 Ingresá tu email Git (user.email):',
            validate: val => /\S+@\S+\.\S+/.test(val) ? undefined : 'Email inválido',
        });
        if ((0, prompts_1.isCancel)(email))
            throw new Error('⛔ Operación cancelada por el usuario.');
        this.gitService.setToken(token);
        if (await this.gitService.validateToken()) {
            try {
                await (0, envSerivce_1.setGitHubConfig)({ token, userName, email });
            }
            catch (err) {
                console.log('⚠️ Error guardando configuración GitHub:', err);
            }
        }
        else {
            throw new Error('Token inválido');
        }
        return {
            token,
            userName: userName.trim(),
            email: email.trim(),
        };
    }
    async promptRepoConfig() {
        const repoName = await (0, prompts_1.text)({
            message: '📁 Nombre del repositorio a crear:',
            validate: (val) => /^[a-zA-Z0-9-_]+$/.test(val) ? undefined : 'Solo letras, números, guiones y guion bajo',
        });
        if ((0, prompts_1.isCancel)(repoName))
            throw new Error('⛔ Operación cancelada por el usuario.');
        const repoDesc = await (0, prompts_1.text)({
            message: '📝 Descripción del repositorio (opcional):',
            validate: () => undefined,
        });
        if ((0, prompts_1.isCancel)(repoDesc))
            throw new Error('⛔ Operación cancelada por el usuario.');
        const visibility = await (0, prompts_1.select)({
            message: '🔒 ¿Querés que el repositorio sea privado o público?',
            options: [
                { label: 'Privado', value: 'Private' },
                { label: 'Público', value: 'Public' },
            ],
        });
        if ((0, prompts_1.isCancel)(visibility))
            throw new Error('⛔ Operación cancelada por el usuario.');
        const autoInit = true; // o preguntá si querés permitir elegir
        const defaultBranch = 'main'; // podrías preguntar si querés personalizar
        return {
            name: repoName,
            description: repoDesc,
            repoVisibility: visibility,
            autoInit,
            defaultBranch,
        };
    }
    async promptGitAndRepoConfig() {
        // pedimos token, usuario y email
        const gitConfig = await this.promptGitConfigSimple();
        if (!gitConfig)
            throw new Error('⛔ Operación cancelada por el usuario.');
        // pedimos configuracion del nuevo repositorio
        const repoConfig = await this.promptRepoConfig();
        if (!repoConfig)
            throw new Error('⛔ Operación cancelada por el usuario.');
        return {
            gitConfig,
            repoConfig,
        };
    }
}
exports.GitPrompt = GitPrompt;
//# sourceMappingURL=gitPrompt.js.map