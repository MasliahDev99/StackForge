import { GitOps } from "../domain/gitOps";
import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
import { GitHubClient } from "./gitHubClient";

export class GitOperator implements GitOps {
  private client: GitHubClient;

  constructor(client: GitHubClient) {
    this.client = client;
  }

  async createRepo(config: UserAnswers): Promise<RepoInfo> {
    if (!config.gitConfig || !config.repoCreation) {
      throw new Error("Faltan datos para crear el repositorio");
    }
  
    const { token } = config.gitConfig;
    if (!token) throw new Error("Token es obligatorio para crear el repositorio");
  
    this.client.setToken(token);

    const isValid = await this.client.validateToken();
    if (!isValid) throw new Error("Token inválido");
  
    // Aquí pasamos directamente repoCreation que es RepoCreationConfig
    return await this.client.createRepository(config.repoCreation);
  }

  async cloneRepo(url: string, path: string): Promise<void> {
    if (!url || !path) {
      throw new Error("URL y path son obligatorios para clonar");
    }
    return this.client.cloneRepository(url, path, true);
  }

  async initRepo(path: string,verbose:boolean): Promise<void> {
    return await  this.client.gitInit(path,verbose)
  }

  async addRemote(repoURL: string,path:string, verbose:boolean): Promise<void>{
    return await this.client.addRemote(repoURL,path,verbose)
  }
  async removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>{
    return await this.client.removeRemoteIfExists(remoteName,path,verbose)
  }
  async gitPush(path: string, branch?: string,message: string = 'Initial commit', verbose?: boolean): Promise<void>{
    return await this.client.gitPush(path,branch,message,verbose)
  }
}