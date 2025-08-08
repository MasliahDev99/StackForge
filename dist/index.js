#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const prompts_1 = require("./cli/prompts");
const creator_1 = require("./core/creator");
const resume_1 = require("./utils/resume");
async function main() {
    const config = await (0, prompts_1.promptUser)();
    if (!config)
        return;
    await (0, creator_1.runCreator)(config);
    (0, resume_1.showResume)(config);
}
//# sourceMappingURL=index.js.map