import { UserAnswers } from '../../types';
import { ProjectOrchestrator } from './projectOrchestrator';
import { logger } from '../../utils/logger';



export async function sfCreateApp(config: UserAnswers) {
    logger.title('INICIANDO GENERACIÓN DEL PROYECTO - ⚡️ StackForge Create App ⚡️');
    const orchestrator = new ProjectOrchestrator();
    await orchestrator.run(config);
}