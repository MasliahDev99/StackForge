import path from "path";
import fs from 'fs'
import { UserAnswers } from "../../types/UserAnswer";
import { logger } from "../../utils/logger";
import { ProjectInstaller } from "../install/projectInstaller";
import { ProjectScaffolder } from "../install/projectScaffolder";
import { ProjectCreatorManager } from "./projectCreatorManager";
import { GitService } from "../git/service/gitService";


export class ProjectOrchestrator {
    constructor(
        private scaffolder = new ProjectScaffolder(),
        private installer = new ProjectInstaller(),
        private creatorManager = new ProjectCreatorManager()
    ) { }

    async run(config: UserAnswers) {
        const originalCwd = process.cwd();
        const pathDestino = path.resolve(originalCwd, config.projectName.toLowerCase());

        try {

            await this.createBaseProject(config);
            this.ensurePathExists(pathDestino);
            process.chdir(pathDestino);

            await this.setupInstallers(config);
            await this.createProjectAssets(config);

            if (config.useGit && config.gitConfig && config.repoCreation) {
                await this.setupGit(config, pathDestino);
            }

            logger.title('PROYECTO CREADO EXITOSAMENTE 🎉');

        } catch (error: any) {
            logger.error(`Error durante la creación del proyecto: ${error.message || error}`);
            throw error;
        } finally {
            process.chdir(originalCwd);
        }
    }

    private async createBaseProject(config: UserAnswers) {
        await this.scaffolder.scaffold(config);
        logger.success(`Proyecto base creado con exito!`)
    }
    private ensurePathExists(pathDestino: string) {
        if (!fs.existsSync(pathDestino)) {
            logger.error(`Carpeta destino no existe: ${pathDestino}`);
            throw new Error('La carpeta del proyecto no se creó correctamente.');
        }
    }

    private async setupInstallers(config: UserAnswers) {
        await this.installer.install(config);
        logger.success('Dependencias e instaladores ejecutados.');
    }

    private async createProjectAssets(config: UserAnswers) {
        await this.creatorManager.create(config);
        logger.success('Estructura, alias y README creados.');
    }

    private async setupGit(config: UserAnswers, pathDestino: string) {
        if (config.useGit && config.gitConfig && config.repoCreation) {

            const gitService = new GitService(config.gitConfig.token);
            logger.info('Creando repositorio remoto en GitHub...');
            const repoInfo = await gitService.createRepository(config);
            config.repoInfo = repoInfo;
            logger.success(`Repositorio creado: ${repoInfo.url}`);

            logger.info('Inicializando repositorio git local...');
            await gitService.initRepository(pathDestino);

            logger.info('Agregando remote origin...');
            await gitService.removeRemoteIfExists('origin', pathDestino, true);
            await gitService.addRemote(repoInfo.url, pathDestino, true);
            logger.success(`Repositorio vinculado a ${repoInfo.url} exitosamente.`);

            logger.info(`Realizando primer commit y push inicial en '${repoInfo.url}' en la rama '${repoInfo.defaultBranch}'...`);
            await gitService.gitPush(pathDestino, repoInfo.defaultBranch, 'primer commit', true);
            logger.success('Primer commit subido al repositorio remoto.');

        }
    }

}