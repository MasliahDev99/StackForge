import { UserAnswers } from '../../types';
import { IProjectStep } from './domain/iProjectStep';
export declare class ReadmeGenerator implements IProjectStep {
    execute(config: UserAnswers): Promise<void>;
}
export declare function generateReadme(config: UserAnswers): Promise<void>;
//# sourceMappingURL=generateReadme.d.ts.map