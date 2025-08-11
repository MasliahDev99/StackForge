/**
 * gitPrompt - Encargado de los pasos para configurar git
 * 
 * 
 */
import { text, isCancel, select } from '@clack/prompts';
import { GitConfig } from '../../core/git/domain/gitConfig';
import { setGitHubConfig } from '../../core/git/service/envSerivce';
import { RepoCreationConfig } from '../../core/git/domain/repoConfig';

import { GitService } from '../../core/git/service/gitService';



export class GitPrompt {
  private gitService: GitService

  constructor(service: GitService) { this.gitService = service }

  async promptGitConfigSimple(): Promise<GitConfig> {
    const token = await text({
      message: '🔑 Ingresá tu token de acceso personal de GitHub (PAT):',
      validate: val => val.length > 0 ? undefined : 'El token no puede estar vacío',
    });
    if (isCancel(token)) throw new Error('⛔ Operación cancelada por el usuario.');

    const userName = await text({
      message: '👤 Ingresá tu nombre de usuario Git (user.name):',
      validate: val => val.trim().length > 0 ? undefined : 'El nombre de usuario no puede estar vacío',
    });
    if (isCancel(userName)) throw new Error('⛔ Operación cancelada por el usuario.');

    const email = await text({
      message: '📧 Ingresá tu email Git (user.email):',
      validate: val => /\S+@\S+\.\S+/.test(val) ? undefined : 'Email inválido',
    });
    if (isCancel(email)) throw new Error('⛔ Operación cancelada por el usuario.');


    this.gitService.setToken(token)

    if (await this.gitService.validateToken()) {
      try {
        await setGitHubConfig({ token, userName, email });
      } catch (err) {
        console.log('⚠️ Error guardando configuración GitHub:', err);
      }
    } else {
      throw new Error('Token inválido');
    }
    return {
      token,
      userName: userName.trim(),
      email: email.trim(),
    };
  }
  async promptRepoConfig(): Promise<RepoCreationConfig> {
    const repoName = await text({
      message: '📁 Nombre del repositorio a crear:',
      validate: (val) => /^[a-zA-Z0-9-_]+$/.test(val) ? undefined : 'Solo letras, números, guiones y guion bajo',
    });
    if (isCancel(repoName)) throw new Error('⛔ Operación cancelada por el usuario.');

    const repoDesc = await text({
      message: '📝 Descripción del repositorio (opcional):',
      validate: () => undefined,
    });
    if (isCancel(repoDesc)) throw new Error('⛔ Operación cancelada por el usuario.');

    const visibility = await select({
      message: '🔒 ¿Querés que el repositorio sea privado o público?',
      options: [
        { label: 'Privado', value: 'Private' },
        { label: 'Público', value: 'Public' },
      ],
    });
    if (isCancel(visibility)) throw new Error('⛔ Operación cancelada por el usuario.');

    const autoInit = true; // o preguntá si querés permitir elegir

    const defaultBranch = 'main'; // podrías preguntar si querés personalizar

    return {
      name: repoName,
      description: repoDesc,
      repoVisibility: visibility,
      autoInit,
      defaultBranch,
    };
  }

  async promptGitAndRepoConfig(): Promise<{ gitConfig: GitConfig; repoConfig: RepoCreationConfig }> {
    // pedimos token, usuario y email
    
    const gitConfig = await this.promptGitConfigSimple();
    if (!gitConfig) throw new Error('⛔ Operación cancelada por el usuario.');

    // pedimos configuracion del nuevo repositorio
    const repoConfig = await this.promptRepoConfig();
    if (!repoConfig) throw new Error('⛔ Operación cancelada por el usuario.');

   
    return {
      gitConfig,
      repoConfig,
    };
  }
}




