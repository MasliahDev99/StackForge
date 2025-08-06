import {
    text,
    select,
    confirm,
    isCancel,
    outro,
    cancel,
  } from '@clack/prompts';
  import chalk from 'chalk';
  import { printBanner } from '../utils/banner';
  import { UserAnswers } from '../types';
  
  export async function promptUser(): Promise<UserAnswers | null> {
    console.clear();
    printBanner()
    console.log(chalk.cyanBright('\n🛠️  Bienvenido a StackForge CLI\n'));
    console.log()
    
    const packageManager = await select({
      message: '📦 ¿Qué gestor de paquetes querés usar?',
      options: [
        { label: 'npm', value: 'npm' },
        { label: 'pnpm', value: 'pnpm' },
      ],
    });
    if (isCancel(packageManager)) return cancelAndExit();

    const projectName = await text({
      message: '📁 Nombre del proyecto:',
      validate: (value) =>
        /^[a-zA-Z0-9-_]+$/.test(value) ? undefined : 'Solo letras, números, guiones y guion bajo.',
    });
    if (isCancel(projectName)) return cancelAndExit();
  
    const packageName = await text({
      message: '📦 Nombre del package:',
      defaultValue: typeof projectName === 'string'
        ? projectName.toLowerCase().replace(/\s+/g, '-')
        : '',
      validate: (value) =>
        /^[a-z0-9-_]+$/.test(value) ? undefined : 'Solo minúsculas, números, guiones y guion bajo.',
    });
    if (isCancel(packageName)) return cancelAndExit();
  
    const bundler = await select({
      message: '🔧 ¿Qué bundler querés usar?',
      options: [
        { label: 'Vite', value: 'Vite' },
        { label: 'Create React App', value: 'CRA' },
        { label: 'Ninguno', value: 'Ninguno' },
      ],
    });
    if (isCancel(bundler)) return cancelAndExit();
  
    const language = await select({
      message: '📝 ¿Qué lenguaje querés usar?',
      options: [
        { label: 'TypeScript', value: 'TypeScript' },
        { label: 'JavaScript', value: 'JavaScript' },
        { label: 'TypeScript + SWC', value: 'TypeScript + SWC' },
      ],
    });
    if (isCancel(language)) return cancelAndExit();
  
    const useTailwind = await confirm({
      message: '🎨 ¿Querés instalar TailwindCSS?',
      initialValue: true,
    });
    if (isCancel(useTailwind)) return cancelAndExit();
  
    let tailwindVersion: 'latest' | '4.1' |'3.4.17' |'2.2.19' | '1.9.6'| '0.7.4'| undefined = undefined;
    if (useTailwind) {
      tailwindVersion = await select({
        message: '📦 Elegí versión de TailwindCSS:',
        options: [
          { label: 'latest', value: 'latest' },
          { label: '4.1', value: '4.1' },
          { label: '3.4.17', value: '3.4.17' },
          { label: '2.2.19', value: '2.2.19' },
          { label: '1.9.6', value: '1.9.6' },
          { label: '0.7.4', value: '0.7.4' },
        ],
      }) as UserAnswers['tailwindVersion'];
      if (isCancel(tailwindVersion)) return cancelAndExit();
    }
  
    const installDeps = await confirm({
      message: '📚 ¿Querés instalar dependencias adicionales?',
      initialValue: false,
    });
    if (isCancel(installDeps)) return cancelAndExit();
  
    let depsList: string | undefined = undefined;
    if (installDeps) {
      depsList = await text({
        message: '🔌 Ingresá las dependencias separadas por espacio:',
        validate: (value) =>
          value.trim().length > 0 ? undefined : 'Ingresá al menos una.',
      }) as string;
      if (isCancel(depsList)) return cancelAndExit();
    }
  
    const createFolders = await confirm({
      message: '📁 ¿Querés crear carpetas dentro de src?',
      initialValue: false,
    });
    if (isCancel(createFolders)) return cancelAndExit();
  
    let folderStructure: string | undefined = undefined;
    if (createFolders) {
      folderStructure = await text({
        message: '📂 Ingresá estructura (ej: componentes/[Auth,Ui], hooks, services/[api.ts]):',
        validate: (value) =>
          value.trim().length > 0 ? undefined : 'Ingresá una estructura válida.',
      }) as string;
      if (isCancel(folderStructure)) return cancelAndExit();
    }
  
    outro(chalk.green('✅ Configuración lista.\n'));
    
    const result: UserAnswers =  {
        projectName: projectName as string,
        packageName: packageName as string,
        bundler: bundler as UserAnswers['bundler'],
        language: language as UserAnswers['language'],
        useTailwind: useTailwind as boolean,
        packageManager: packageManager as UserAnswers['packageManager'],
        installDeps, 
        createFolders,
    }
    // si no son undefined las agrego al resultado
    if(tailwindVersion !== undefined) result.tailwindVersion = tailwindVersion
    if(depsList !== undefined) result.depsList = depsList
    if(folderStructure !== undefined) result.folderStructure = folderStructure

    return result
  }
  
  function cancelAndExit(): null {
    cancel('⛔ Operación cancelada por el usuario.');
    return null;
  }