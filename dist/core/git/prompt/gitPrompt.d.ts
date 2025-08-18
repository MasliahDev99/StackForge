import { GitConfig } from '../domain/gitConfig';
import { RepoCreationConfig } from '../domain/repoConfig';
import { GitService } from '../service/gitService';
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
