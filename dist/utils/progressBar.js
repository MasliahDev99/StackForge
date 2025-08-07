"use strict";
/**
 *
 *  Barra de carga
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProgressBar = initProgressBar;
exports.advanceStep = advanceStep;
exports.stopProgressBar = stopProgressBar;
exports.step = step;
const cli_progress_1 = require("cli-progress");
const chalk_1 = __importDefault(require("chalk"));
const bar = new cli_progress_1.SingleBar({
    format: `${chalk_1.default.cyanBright('{task}')} | {bar} | {percentage}% || {step}/{total} pasos`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
}, cli_progress_1.Presets.shades_classic);
let current = 0;
let total = 0;
function initProgressBar(steps) {
    current = 0;
    total = steps.length;
    bar.start(total, 0, { step: current, task: steps[0] });
}
function advanceStep(task) {
    current++;
    bar.update(current, { step: current, task });
}
function stopProgressBar() {
    bar.stop();
}
async function step(action, task) {
    await action();
    advanceStep(task);
}
//# sourceMappingURL=progressBar.js.map