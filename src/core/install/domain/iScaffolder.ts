import { UserAnswers } from "../../../types";

export interface IScaffolder{
    scaffold(config: UserAnswers): Promise<void>;
}