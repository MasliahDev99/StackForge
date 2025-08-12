import { UserAnswers } from "../../types";
import { AliasConfigurator } from "./alias";
import { IProjectStep } from "./domain/iProjectStep";
import { FolderStructureCreator } from "./folderStructure";
import { ReadmeGenerator } from "./generateReadme";


export class ProjectCreatorManager {
    private steps: IProjectStep[];
  
    constructor() {
      this.steps = [
        new FolderStructureCreator(),
        new AliasConfigurator(),
        new ReadmeGenerator(),
      ];
    }
  
    async create(config: UserAnswers) {
      for (const step of this.steps) {
        await step.execute(config);
      }
    }
  }