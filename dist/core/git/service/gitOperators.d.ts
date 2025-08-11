import { GitOps } from "../domain/gitOps";
import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
import { GitHubClient } from "./gitHubClient";
export declare class GitOperator implements GitOps {
    private client;
    constructor(client: GitHubClient);
    createRepo(config: UserAnswers): Promise<RepoInfo>;
    cloneRepo(url: string, path: string): Promise<void>;
    initRepo(path: string, verbose: boolean): Promise<void>;
    addRemote(repoURL: string, path: string, verbose: boolean): Promise<void>;
    removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
    gitPush(path: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
}
//# sourceMappingURL=gitOperators.d.ts.map