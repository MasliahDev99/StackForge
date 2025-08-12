import { UserAnswers } from "../../../types";

export interface IProjectStep {
  execute(config: UserAnswers): Promise<void>;
}