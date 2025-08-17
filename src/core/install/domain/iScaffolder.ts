import { UserAnswers } from "../../../types/UserAnswer";

export interface IScaffolder{
    scaffold(config: UserAnswers): Promise<void>;
}