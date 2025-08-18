"use strict";
/**
 *  alias - Soporte de paths
 *
 *  Responsable de:
 *
 *  - Configurar alias en tsconfig.json (@components, @utils, etc.)
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAliases = exports.AliasConfigurator = void 0;
const setupAliases_1 = require("./setup/setupAliases");
Object.defineProperty(exports, "setupAliases", { enumerable: true, get: function () { return setupAliases_1.setupAliases; } });
class AliasConfigurator {
    async execute(config) {
        await (0, setupAliases_1.setupAliases)({ bundler: config.bundler, language: config.language });
    }
}
exports.AliasConfigurator = AliasConfigurator;
