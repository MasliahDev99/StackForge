import { UserAnswers } from "../../types/UserAnswer";
import { IScaffolder } from "./domain/iScaffolder";
export declare class ProjectScaffolder implements IScaffolder {
    scaffold(config: UserAnswers): Promise<void>;
}
