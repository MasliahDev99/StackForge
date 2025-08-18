import { UserAnswers } from "../../types/UserAnswer";
import { ProjectInstaller } from "../install/projectInstaller";
import { ProjectScaffolder } from "../install/projectScaffolder";
import { ProjectCreatorManager } from "./projectCreatorManager";
export declare class ProjectOrchestrator {
    private scaffolder;
    private installer;
    private creatorManager;
    constructor(scaffolder?: ProjectScaffolder, installer?: ProjectInstaller, creatorManager?: ProjectCreatorManager);
    run(config: UserAnswers): Promise<void>;
    private createBaseProject;
    private ensurePathExists;
    private setupInstallers;
    private createProjectAssets;
    private setupGit;
}
