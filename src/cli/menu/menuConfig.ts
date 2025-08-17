import { isCancel, select } from "@clack/prompts";
import { GitService } from "../../core/git/service/gitService";
import { logger } from "../../utils/logger";
import { GitPrompt } from "../../core/git/prompt/gitPrompt";
import { menuQuickProject } from "./menuQuickProject";
import chalk from "chalk";
import { clearQuickConfig } from "../../utils/clearQuick";



export async function menuConfig() {
    while (true) {
      const configOption = await select({
        message: chalk.cyan('Configuración:\n'),
        options: [
          { label: 'Configurar GitHub (Token)', value: 'configGit' },
          { label: 'Configurar proyecto rápido', value: 'quickProject' },
          { label: 'Limpiar configuración de proyecto rápido', value: 'clearQuick' },
          { label: 'Volver', value: 'back' },
        ],
      });
  
      if (isCancel(configOption) || configOption === 'back') return;
  
      switch (configOption) {
        case 'configGit':
          const gitService = new GitService();
          const gitPrompt = new GitPrompt(gitService);
          const config = await gitPrompt.promptGitConfigSimple();
          if (config) {
            const user = await gitService.getUserName();
            logger.success(`Configuración GitHub exitosa! Usuario autenticado: ${chalk.cyan(user)}`);
          }
          break;
  
        case 'quickProject':
          console.clear()
          await menuQuickProject()
          break;
  
        case 'clearQuick':
          clearQuickConfig()
          break;
      }
    }
  }