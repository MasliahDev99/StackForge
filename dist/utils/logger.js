"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.logger = {
    info: (msg) => console.log(`${chalk_1.default.blue('ℹ INFO')}    → ${msg}`),
    success: (msg) => console.log(`${chalk_1.default.green('✔ SUCCESS')} → ${msg}`),
    warn: (msg) => console.warn(`${chalk_1.default.yellow('⚠ WARN')}    → ${msg}`),
    error: (msg) => console.error(`${chalk_1.default.red('✖ ERROR')}   → ${msg}`),
    title: (msg) => console.log(`\n${chalk_1.default.magenta.bold('=== ' + msg.toUpperCase() + ' ===')}`),
};
