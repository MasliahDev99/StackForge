import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
import { GitHubClient } from "./gitHubClient";
import { GitOperator } from "./gitOperators";


export class GitService{
  private client: GitHubClient;
  private operator: GitOperator;

  constructor(token?: string) {
    this.client = new GitHubClient(token || '');
    this.operator = new GitOperator(this.client);
  }

  async createRepository(config: UserAnswers): Promise<RepoInfo> {
    return await this.operator.createRepo(config);
  }

  async cloneRepository(url: string, path: string) : Promise<void> {
    return await this.operator.cloneRepo(url, path);
  }

  async initRepository(path: string): Promise<void> {
    return await this.operator.initRepo(path, true);
  }

  async removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>{
    return await this.operator.removeRemoteIfExists(remoteName,path,verbose)
  }

  async validateToken() {
    return await this.client.validateToken();
  }
  async addRemote(repoURL: string,path:string, verbose:boolean): Promise<void>{
    return await this.client.addRemote(repoURL,path,verbose)
  }

  async gitPush(pathDestino: string, branch: string = 'main',message: string = 'Initial commit', verbose: boolean = true): Promise<void> {
    return await this.operator.gitPush(pathDestino, branch,message ,verbose);
  }


  setToken(token: string) {
    this.client.setToken(token);
  }
  getToken(){
    return this.client.getToken()
  }

  
}