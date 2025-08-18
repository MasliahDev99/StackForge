import { UserAnswers } from "../../types/UserAnswer";
import { IInstaller } from "./domain/iInstaller";
export declare class DependenciesInstaller implements IInstaller {
    install(config: UserAnswers): Promise<void>;
}
