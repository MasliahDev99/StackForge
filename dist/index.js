#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("./cli/prompts");
const creator_1 = require("./core/creator");
const logger_1 = require("./utils/logger");
async function main() {
    const config = await (0, prompts_1.promptUser)();
    if (!config)
        return;
    await (0, creator_1.runCreator)(config);
    console.log(`\n✅ Configuración final:\n${JSON.stringify(config, null, 2)}\n`);
}
main().catch((err) => {
    logger_1.logger?.error(`❌ Error inesperado: ${err.message}`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map