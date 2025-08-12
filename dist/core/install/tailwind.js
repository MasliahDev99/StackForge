"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTailwind = exports.TailwindInstaller = void 0;
const setupTailwind_1 = require("./setups/setupTailwind");
Object.defineProperty(exports, "setupTailwind", { enumerable: true, get: function () { return setupTailwind_1.setupTailwind; } });
class TailwindInstaller {
    async install(config) {
        if (!config.useTailwind)
            return;
        await (0, setupTailwind_1.setupTailwind)(config);
    }
}
exports.TailwindInstaller = TailwindInstaller;
//# sourceMappingURL=tailwind.js.map