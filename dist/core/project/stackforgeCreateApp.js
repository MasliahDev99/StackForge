"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sfCreateApp = sfCreateApp;
const projectOrchestrator_1 = require("./projectOrchestrator");
const logger_1 = require("../../utils/logger");
async function sfCreateApp(config) {
    logger_1.logger.title('INICIANDO GENERACIÓN DEL PROYECTO - ⚡️ StackForge Create App ⚡️');
    const orchestrator = new projectOrchestrator_1.ProjectOrchestrator();
    await orchestrator.run(config);
}
