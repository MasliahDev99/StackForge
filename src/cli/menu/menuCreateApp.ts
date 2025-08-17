import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import { sfCreateApp } from "../../core/project/stackforgeCreateApp";
import { showResume } from "../../utils/resume";
import { PromptRouter } from "../../core/project/prompt/promptRouter";

// Submenú Crear Aplicación
export async function menuCreateApp() {
    while (true) {
      const createOption = await select({
        message: chalk.cyan('Crear aplicación:\n'),
        options: [
          { label: 'Crear proyecto rápido', value: 'quick' },
          { label: 'Crear proyecto manual', value: 'manual' },
          { label: 'Volver', value: 'back' },
        ],
      });
  
      if (isCancel(createOption) || createOption === 'back') return;
  
      switch (createOption) {
        case 'quick':
          const quickAnswer = await PromptRouter.execute("quick")
          if(!quickAnswer) return
          await sfCreateApp(quickAnswer)
          showResume(quickAnswer)
          break;
   
        case 'manual':
          const answers = await PromptRouter.execute("manual")
          if (!answers) return;
          await sfCreateApp(answers);
          showResume(answers);
          break;
      }
    }
  }
  