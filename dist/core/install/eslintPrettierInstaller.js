"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLinting = exports.ESLintPrettierInstaller = void 0;
const setupLinting_1 = require("./setups/setupLinting");
Object.defineProperty(exports, "setupLinting", { enumerable: true, get: function () { return setupLinting_1.setupLinting; } });
class ESLintPrettierInstaller {
    async install(config) {
        await (0, setupLinting_1.setupLinting)();
    }
}
exports.ESLintPrettierInstaller = ESLintPrettierInstaller;
