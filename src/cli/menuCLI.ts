import { printBanner } from '../utils/banner';
import { select, cancel, outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { menuConfig } from './menu/menuConfig';
import { menuCreateApp } from './menu/menuCreateApp';



export async function menuCLI() {
  while (true) {
    console.clear();
    printBanner();
    const option = await select({
      message: chalk.cyan('Seleccione una opción:\n'),
      options: [
        { label: 'Configuración', value: 'config' },
        { label: 'Crear aplicación', value: 'createApp' },
        { label: 'Salir', value: 'exit' },
      ],
    });

    if (isCancel(option)) {
      console.clear();
      cancel('⛔ Operación cancelada.');
      return;
    }

    switch (option) {
      case 'config':
        console.clear()
        await menuConfig();
        break;

      case 'createApp':
        console.clear()
        await menuCreateApp();
        break;

      case 'exit':
        console.clear();
        outro(chalk.green('¡Hasta luego!'));
        process.exit(0);
    }
  }
}




