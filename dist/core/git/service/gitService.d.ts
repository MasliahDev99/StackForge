import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
export declare class GitService {
    private client;
    private operator;
    constructor(token?: string);
    createRepository(config: UserAnswers): Promise<RepoInfo>;
    cloneRepository(url: string, path: string): Promise<void>;
    initRepository(path: string): Promise<void>;
    removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
    validateToken(): Promise<boolean>;
    addRemote(repoURL: string, path: string, verbose: boolean): Promise<void>;
    gitPush(pathDestino: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
    setToken(token: string): void;
    getToken(): string;
    getUserName(): Promise<string>;
}
//# sourceMappingURL=gitService.d.ts.map