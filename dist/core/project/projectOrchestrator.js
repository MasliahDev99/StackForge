"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOrchestrator = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../../utils/logger");
const projectInstaller_1 = require("../install/projectInstaller");
const projectScaffolder_1 = require("../install/projectScaffolder");
const projectCreatorManager_1 = require("./projectCreatorManager");
const gitService_1 = require("../git/service/gitService");
class ProjectOrchestrator {
    constructor(scaffolder = new projectScaffolder_1.ProjectScaffolder(), installer = new projectInstaller_1.ProjectInstaller(), creatorManager = new projectCreatorManager_1.ProjectCreatorManager()) {
        this.scaffolder = scaffolder;
        this.installer = installer;
        this.creatorManager = creatorManager;
    }
    async run(config) {
        const originalCwd = process.cwd();
        const pathDestino = path_1.default.resolve(originalCwd, config.projectName.toLowerCase());
        try {
            await this.createBaseProject(config);
            this.ensurePathExists(pathDestino);
            process.chdir(pathDestino);
            await this.setupInstallers(config);
            await this.createProjectAssets(config);
            if (config.useGit && config.gitConfig && config.repoCreation) {
                await this.setupGit(config, pathDestino);
            }
            logger_1.logger.title('PROYECTO CREADO EXITOSAMENTE 🎉');
        }
        catch (error) {
            logger_1.logger.error(`Error durante la creación del proyecto: ${error.message || error}`);
            throw error;
        }
        finally {
            process.chdir(originalCwd);
        }
    }
    async createBaseProject(config) {
        await this.scaffolder.scaffold(config);
        logger_1.logger.success(`Proyecto base creado con exito!`);
    }
    ensurePathExists(pathDestino) {
        if (!fs_1.default.existsSync(pathDestino)) {
            logger_1.logger.error(`Carpeta destino no existe: ${pathDestino}`);
            throw new Error('La carpeta del proyecto no se creó correctamente.');
        }
    }
    async setupInstallers(config) {
        await this.installer.install(config);
        logger_1.logger.success('Dependencias e instaladores ejecutados.');
    }
    async createProjectAssets(config) {
        await this.creatorManager.create(config);
        logger_1.logger.success('Estructura, alias y README creados.');
    }
    async setupGit(config, pathDestino) {
        if (config.useGit && config.gitConfig && config.repoCreation) {
            const gitService = new gitService_1.GitService(config.gitConfig.token);
            logger_1.logger.info('Creando repositorio remoto en GitHub...');
            const repoInfo = await gitService.createRepository(config);
            config.repoInfo = repoInfo;
            logger_1.logger.success(`Repositorio creado: ${repoInfo.url}`);
            logger_1.logger.info('Inicializando repositorio git local...');
            await gitService.initRepository(pathDestino);
            logger_1.logger.info('Agregando remote origin...');
            await gitService.removeRemoteIfExists('origin', pathDestino, true);
            await gitService.addRemote(repoInfo.url, pathDestino, true);
            logger_1.logger.success(`Repositorio vinculado a ${repoInfo.url} exitosamente.`);
            logger_1.logger.info(`Realizando primer commit y push inicial en '${repoInfo.url}' en la rama '${repoInfo.defaultBranch}'...`);
            await gitService.gitPush(pathDestino, repoInfo.defaultBranch, 'primer commit', true);
            logger_1.logger.success('Primer commit subido al repositorio remoto.');
        }
    }
}
exports.ProjectOrchestrator = ProjectOrchestrator;
