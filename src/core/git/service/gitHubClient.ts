import { Octokit } from "@octokit/rest";
import { RepoInfo } from "../domain/repoInfo";
import { RepoCreationConfig } from "../domain/repoConfig";
import { execCommand } from "../../../utils/exec";


/**
 *   GitHubClient - Encargado la comunicacion con Github y validacion del token de authenticacion
 */
export class GitHubClient {
  private octokit: Octokit;
  private token: string;

  constructor(token: string) {
    this.token = token
    this.octokit = new Octokit({ auth: token });
  }

  setToken(token: string) {
    this.token = token
    this.octokit = new Octokit({ auth: token });
  }
  getToken() {
    return this.token
  }

  async validateToken(): Promise<boolean> {
    try {
      await this.octokit.rest.users.getAuthenticated();
      return true;
    } catch {
      return false;
    }
  }

  async getUserNameByToken(): Promise<string>{
    try{
      const { data:user } = await this.octokit.rest.users.getAuthenticated()
      return user.login
    }catch(error){
      throw new Error('No se pudo obtener el nombre de usuario autenticado.');
    }
  }
  /**
   * 
   * 
   */
  async createRepository(params: RepoCreationConfig): Promise<RepoInfo> {
    const response = await this.octokit.rest.repos.createForAuthenticatedUser({
      name: params.name,
      description: params.description,
      private: params.repoVisibility === "Private",
      auto_init: false,  // si esta en true crea repositorio con real
      default_branch: params.defaultBranch,
    });

    return {
      url: response.data.clone_url,
      name: response.data.name,
      defaultBranch: response.data.default_branch || params.defaultBranch || "main",
    };
  }

  async cloneRepository(urlRepo: string, pathDestino: string, verbose: boolean): Promise<void> {
    if (!urlRepo || !pathDestino) {
      throw new Error("URL y path son obligatorios para clonar");
    }
    try {
      const command: string = `git clone ${urlRepo} ${pathDestino}`
      await execCommand(command, { verbose: verbose })
    } catch (error: any) {
      throw new Error(`Error al clonar el repositorio: ${error.message || error}`);
    }
  }

  async gitInit(pathDestino: string, verbose: boolean = true): Promise<void> {
    if (!pathDestino) {
      throw new Error("El path destino no puede estar vacío.");
    }

    try {
      const command = `git init`;
      await execCommand(command, { cwd: pathDestino, verbose });
    } catch (error: any) {
      throw new Error(`Error al inicializar el repositorio git: ${error.message || error}`);
    }
  }

  async removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void> {
    try {
      
      await execCommand(`git remote get-url ${remoteName}`, { cwd: path, verbose: false });
    
      if (verbose) {
        console.log(`Remote ${remoteName} existe, eliminando...`);
      }
      await execCommand(`git remote remove ${remoteName}`, { cwd: path, verbose });
    } catch {
     
      if (verbose) {
        console.log(`Remote ${remoteName} no existe, no se elimina.`);
      }
    }
  }

  async addRemote(repoURL: string, path: string, verbose: boolean): Promise<void> {
    if (!repoURL || !path) {
      throw new Error("URL y path son obligatorios.");
    }
    try {
      const command = `git remote add origin ${repoURL}`
      await execCommand(command, { cwd: path, verbose })

    } catch (error: any) {
      throw new Error(`Error al inicializar el repositorio git: ${error.message || error}`);
    }

  }
  async gitPush(pathDestino: string, branch: string = 'main',message: string = 'Initial commit', verbose: boolean = true): Promise<void> {
    if (!pathDestino) {
      throw new Error("El path destino no puede estar vacío.");
    }
    try {
      const command = `git push -u origin ${branch}`;
      await execCommand(`git add .`);
      await execCommand(`git commit -m "${message}"`, { cwd: pathDestino, verbose });
      await execCommand(command, { cwd: pathDestino, verbose });
    } catch (error: any) {
      throw new Error(`Error al hacer git push: ${error.message || error}`);
    }
  }
}