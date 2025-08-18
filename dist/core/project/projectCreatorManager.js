"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCreatorManager = void 0;
const alias_1 = require("./alias");
const folderStructure_1 = require("./folderStructure");
const generateReadme_1 = require("./generateReadme");
class ProjectCreatorManager {
    constructor() {
        this.steps = [
            new folderStructure_1.FolderStructureCreator(),
            new alias_1.AliasConfigurator(),
            new generateReadme_1.ReadmeGenerator(),
        ];
    }
    async create(config) {
        for (const step of this.steps) {
            await step.execute(config);
        }
    }
}
exports.ProjectCreatorManager = ProjectCreatorManager;
