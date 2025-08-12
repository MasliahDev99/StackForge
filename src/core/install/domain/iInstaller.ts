import { UserAnswers } from "../../../types";

export interface IInstaller {
    install(config: UserAnswers): Promise<void>;
  }