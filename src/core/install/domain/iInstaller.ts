import { UserAnswers } from "../../../types/UserAnswer";

export interface IInstaller {
    install(config: UserAnswers): Promise<void>;
  }