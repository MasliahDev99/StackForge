import { RepoInfo } from "../domain/repoInfo";
import { RepoCreationConfig } from "../domain/repoConfig";
/**
 *   GitHubClient - Encargado la comunicacion con Github y validacion del token de authenticacion
 */
export declare class GitHubClient {
    private octokit;
    private token;
    constructor(token: string);
    setToken(token: string): void;
    getToken(): string;
    validateToken(): Promise<boolean>;
    /**
     *
     *
     */
    createRepository(params: RepoCreationConfig): Promise<RepoInfo>;
    cloneRepository(urlRepo: string, pathDestino: string, verbose: boolean): Promise<void>;
    gitInit(pathDestino: string, verbose?: boolean): Promise<void>;
    removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
    addRemote(repoURL: string, path: string, verbose: boolean): Promise<void>;
    gitPush(pathDestino: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
}
//# sourceMappingURL=gitHubClient.d.ts.map