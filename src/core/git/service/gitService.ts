import { UserAnswers } from "../../../types";
import { RepoInfo } from "../domain/repoInfo";
import { GitHubClient } from "./gitHubClient";
import { GitOperator } from "./gitOperators";

/**
 * Clase que proporciona una interfaz de alto nivel para interactuar con repositorios Git y GitHub.
 * Permite crear, clonar, inicializar repositorios, gestionar remotos y realizar operaciones de push,
 * así como validar y gestionar el token de autenticación.
 */
export class GitService{
  private client: GitHubClient;
  private operator: GitOperator;

  /**
   * Inicializa una nueva instancia de la clase GitService.
   * @param token Token de autenticación de GitHub (opcional).
   */
  constructor(token?: string) {
    this.client = new GitHubClient(token || '');
    this.operator = new GitOperator(this.client);
  }

  /**
   * Crea un nuevo repositorio en GitHub según la configuración proporcionada.
   * @param config Objeto de configuración con los datos del repositorio.
   * @returns Información del repositorio creado.
   */
  async createRepository(config: UserAnswers): Promise<RepoInfo> {
    return await this.operator.createRepo(config);
  }

  /**
   * Clona un repositorio remoto en una ruta local especificada.
   * @param url URL del repositorio remoto.
   * @param path Ruta local donde se clonará el repositorio.
   * @param verbose Indica si se debe mostrar información detallada del proceso.
   * @returns Promesa que se resuelve cuando la operación finaliza.
   */
  async cloneRepository(url: string, path: string, verbose:boolean) : Promise<void> {
    return await this.operator.cloneRepo(url, path,verbose);
  }

  /**
   * Inicializa un nuevo repositorio Git en la ruta especificada.
   * @param path Ruta local donde se inicializará el repositorio.
   * @returns Promesa que se resuelve cuando la operación finaliza.
   */
  async initRepository(path: string): Promise<void> {
    return await this.operator.initRepo(path, true);
  }

  /**
   * Elimina un remoto de un repositorio local si existe.
   * @param remoteName Nombre del remoto a eliminar.
   * @param path Ruta local del repositorio.
   * @param verbose Indica si se debe mostrar información detallada del proceso.
   * @returns Promesa que se resuelve cuando la operación finaliza.
   */
  async removeRemoteIfExists(remoteName: string, path: string, verbose: boolean): Promise<void>{
    return await this.operator.removeRemoteIfExists(remoteName,path,verbose)
  }

  /**
   * Valida el token de autenticación de GitHub para comprobar su validez.
   * @returns Promesa que se resuelve con el resultado de la validación.
   */
  async validateToken() {
    return await this.client.validateToken();
  }

  /**
   * Agrega un remoto a un repositorio local.
   * @param repoURL URL del repositorio remoto.
   * @param path Ruta local del repositorio.
   * @param verbose Indica si se debe mostrar información detallada del proceso.
   * @returns Promesa que se resuelve cuando la operación finaliza.
   */
  async addRemote(repoURL: string,path:string, verbose:boolean): Promise<void>{
    return await this.operator.addRemote(repoURL,path,verbose)
  }

  /**
   * Realiza un push de los cambios locales a un repositorio remoto.
   * @param pathDestino Ruta local del repositorio.
   * @param branch Nombre de la rama a la que se realizará el push (por defecto 'main').
   * @param message Mensaje del commit (por defecto 'Initial commit').
   * @param verbose Indica si se debe mostrar información detallada del proceso (por defecto true).
   * @returns Promesa que se resuelve cuando la operación finaliza.
   */
  async gitPush(pathDestino: string, branch: string = 'main',message: string = 'Initial commit', verbose: boolean = true): Promise<void> {
    return await this.operator.gitPush(pathDestino, branch,message ,verbose);
  }


  /**
   * Establece el token de autenticación para las operaciones de GitHub.
   * @param token Token de autenticación de GitHub.
   */
  setToken(token: string) {
    this.client.setToken(token);
  }

  /**
   * Obtiene el token de autenticación actualmente utilizado.
   * @returns El token de autenticación de GitHub.
   */
  getToken(){
    return this.client.getToken()
  }

  /**
   * Obtiene el nombre de usuario de GitHub asociado al token actual.
   * @returns Promesa que se resuelve con el nombre de usuario.
   */
  async getUserName(): Promise<string>{
    return await this.client.getUserNameByToken() 
  }
}