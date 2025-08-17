import { UserAnswers } from "../../types/UserAnswer";
import { IScaffolder } from "./domain/iScaffolder";
import { logger } from "../../utils/logger";
import { scaffoldProject } from "./setups/scaffoldProject";




export class ProjectScaffolder implements IScaffolder {
    async scaffold(config: UserAnswers): Promise<void>{
        logger.info(`📦 Creando proyecto ${config.projectName} con bundler ${config.bundler}...`);
        await scaffoldProject(config);
        logger.success(`✅ Proyecto ${config.projectName} creado correctamente.`);
    }
}