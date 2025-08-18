import { UserAnswers } from "../../../types/UserAnswer";
export declare class PromptRouter {
    static execute(type: "manual" | "quick"): Promise<UserAnswers | null>;
}
