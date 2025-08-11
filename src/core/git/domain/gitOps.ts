import { UserAnswers } from "../../../types";
import { RepoInfo } from "./repoInfo";


// Interfaz especifica para las operaciones de git Operator

export interface GitOps {
  createRepo(config: UserAnswers): Promise<RepoInfo>;
  cloneRepo(url: string, path: string, verbose: boolean): Promise<void>;
  initRepo(path: string,verbose:boolean): Promise<void>;
  addRemote(repoURL: string,path:string, verbose:boolean): Promise<void>;
  removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>;
  gitPush(path: string, branch?: string, message?: string, verbose?: boolean): Promise<void>;
}