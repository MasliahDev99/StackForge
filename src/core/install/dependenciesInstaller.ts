import { UserAnswers } from "../../types";
import { execCommand } from "../../utils/exec";
import { logger } from "../../utils/logger";
import { runAudit } from "../audit/audit";
import { IInstaller } from "./domain/iInstaller";


export class DependenciesInstaller implements IInstaller {
    async install(config: UserAnswers): Promise<void> {
        
        if(!config.installDeps) return
        // lista de dependencias
        const { depsList, packageManager } = config


        if (!depsList || depsList.trim() === '') {
            logger.info('No hay dependencias adicionales para instalar.');
            return;
        }

        try {
            await execCommand(`${packageManager} install ${depsList}`, { verbose: false });
            await runAudit(config);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message)
            } else {
                logger.error(String(error))
            }
            throw new Error('La instalación fue cancelada debido a vulnerabilidades no resueltas. Por favor revise documentacion de la dependencia.');
        }
    }
}