import { printBanner } from '../utils/banner';
import { select, cancel, outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { promptUser } from './prompts/prompts';
import { sfCreateApp } from '../core/project/stackforgeCreateApp';
import { showResume } from '../utils/resume';
import { GitService } from '../core/git/service/gitService';
import { GitPrompt } from './prompts/gitPrompt';
import { logger } from '../utils/logger';


export async function menuCLI() {

  console.clear();
  printBanner();

  while (true) {

    const option = await select({
      message: chalk.cyan('Seleccione una opción:\n'),
      options: [
        { label: 'Configurar GitHub', value: 'configGit' },
        { label: 'Crear aplicación', value: 'createApp' },
        { label: 'Salir', value: 'exit' },
      ],
    });

    if (isCancel(option)) {
      console.clear()
      cancel('⛔ Operación cancelada.');
      return;
    }

    switch (option) {
      case 'configGit':
        const gitService = new GitService()
        const gitPrompt = new GitPrompt(gitService)
        const config = await gitPrompt.promptGitConfigSimple()
        if (config) {
          const user = await gitService.getUserName(); // método que consulta la API con el token
          logger.success(`Configuración GitHub exitosa! Usuario autenticado: ${chalk.cyan(user)}`);
        }
        break;

      case 'createApp':

        const answers = await promptUser();
        if (!answers) return;
        await sfCreateApp(answers)
        showResume(answers)
        break;

      case 'exit':
        console.clear()
        outro(chalk.green('¡Hasta luego!'));
        process.exit(0);
    }
  }
}



