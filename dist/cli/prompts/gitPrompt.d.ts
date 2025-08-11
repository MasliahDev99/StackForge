import { GitConfig } from '../../core/git/domain/gitConfig';
import { RepoCreationConfig } from '../../core/git/domain/repoConfig';
import { GitService } from '../../core/git/service/gitService';
export declare class GitPrompt {
    private gitService;
    constructor(service: GitService);
    promptGitConfigSimple(): Promise<GitConfig>;
    promptRepoConfig(): Promise<RepoCreationConfig>;
    promptGitAndRepoConfig(): Promise<{
        gitConfig: GitConfig;
        repoConfig: RepoCreationConfig;
    }>;
}
//# sourceMappingURL=gitPrompt.d.ts.map