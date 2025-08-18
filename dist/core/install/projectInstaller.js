"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInstaller = void 0;
const dependenciesInstaller_1 = require("./dependenciesInstaller");
const eslintPrettierInstaller_1 = require("./eslintPrettierInstaller");
const tailwind_1 = require("./tailwind");
class ProjectInstaller {
    constructor() {
        this.installers = [
            new tailwind_1.TailwindInstaller(),
            new eslintPrettierInstaller_1.ESLintPrettierInstaller(),
            new dependenciesInstaller_1.DependenciesInstaller(),
        ];
    }
    async install(config) {
        for (const installer of this.installers) {
            await installer.install(config);
        }
    }
}
exports.ProjectInstaller = ProjectInstaller;
