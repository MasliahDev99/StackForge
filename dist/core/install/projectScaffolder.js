"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectScaffolder = void 0;
const logger_1 = require("../../utils/logger");
const scaffoldProject_1 = require("./setups/scaffoldProject");
class ProjectScaffolder {
    async scaffold(config) {
        logger_1.logger.info(`📦 Creando proyecto ${config.projectName} con bundler ${config.bundler}...`);
        await (0, scaffoldProject_1.scaffoldProject)(config);
        logger_1.logger.success(`✅ Proyecto ${config.projectName} creado correctamente.`);
    }
}
exports.ProjectScaffolder = ProjectScaffolder;
//# sourceMappingURL=projectScaffolder.js.map