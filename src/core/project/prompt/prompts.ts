import {
  text,
  select,
  confirm,
  isCancel,
  outro,
  cancel,
} from '@clack/prompts';
import chalk from 'chalk';
import { UserAnswers } from '../../../types/UserAnswer';
import { printBanner } from '../../../utils/banner';
import { GitPrompt } from '../../git/prompt/gitPrompt';
import { GitService } from '../../git/service/gitService';
import dotenv from 'dotenv'

dotenv.config();

/**
 * Función principal que coordina los prompts para la configuración completa del proyecto.
 * Incluye configuración opcional de GitHub, configuración general del proyecto,
 * TailwindCSS, dependencias adicionales y estructura de carpetas.
 *
 * @returns {Promise<UserAnswers | null>} Un objeto con las respuestas del usuario o null si se cancela.
 */
export async function promptUser(): Promise<UserAnswers | null> {
  console.clear();
  printBanner()
  console.log(chalk.cyanBright('\n🛠️  Bienvenido a StackForge CLI\n'));
  console.log()

  // Pregunta al usuario si desea inicializar el proyecto con git.
  const useGit = await confirm({
    message: '📚 ¿Querés inicializar proyecto con git?',
    initialValue: false,
  });
  if (isCancel(useGit)) return cancelAndExit();

  // Manejo de configuración GitHub en caso de que useGit sea true.
  let gitConfigData = null
  if (useGit) {
    const token = process.env.GITHUB_TOKEN;
    const userName = process.env.GITHUB_USERNAME

    if (!token) {
      console.log("No se encontro el token PAT de GITHUB. Por favor configurá el token primero.")
      return null
    }
    const gitService = new GitService(token);
    const isValid = await gitService.validateToken();

    if (!isValid) {
      console.log("Token inválido o expirado, por favor configurá nuevamente.")
      return null
    }
    const gitPrompt = new GitPrompt(gitService);

    const repoConfig = await gitPrompt.promptRepoConfig();

    gitConfigData = {
      gitConfig: {
        token,
        userName: userName ?? '',

      },
      repoConfig
    }
  }

  // Prompts para configuración general del proyecto
  const generalConfig = await promptGeneralProjectConfig();
  if (!generalConfig) return null;

  // Prompts para configuración de Tailwind
  const tailwindConfig = await promptTailwindConfig();
  if (!tailwindConfig) return null;

  // Prompts para instalación de dependencias adicionales
  const depsConfig = await promptDepsConfig();
  if (!depsConfig) return null;

  // Prompts para estructura de carpetas
  const folderConfig = await promptFolderStructureConfig();
  if (!folderConfig) return null;

  outro(chalk.green('✅ Configuración lista.\n'));

  // Construye el objeto resultado con todas las configuraciones recolectadas.
  const result: UserAnswers = {
    ...generalConfig,
    ...tailwindConfig,
    ...depsConfig,
    ...folderConfig,
    useGit,
  }
  if (gitConfigData) {
    result.gitConfig = gitConfigData.gitConfig;
    result.repoCreation = gitConfigData.repoConfig;
  }

  return result
}

/**
 * Función auxiliar para manejar la cancelación por parte del usuario.
 * Muestra mensaje y retorna null.
 * 
 * @returns {null}
 */
function cancelAndExit(): null {
  cancel('⛔ Operación cancelada por el usuario.');
  return null;
}

/**
 * Solicita al usuario la configuración general básica del proyecto.
 * Incluye gestor de paquetes, nombre del proyecto y package,
 * bundler y lenguaje a utilizar.
 *
 * @returns {Promise<Pick<UserAnswers, 'projectName' | 'packageName' | 'bundler' | 'language' | 'packageManager'> | null>}
 * Objeto parcial con la configuración general o null si se cancela.
 */
export async function promptGeneralProjectConfig(): Promise<Pick<UserAnswers, 'projectName' | 'packageName' | 'bundler' | 'language' | 'packageManager'> | null> {
  const packageManager = await select({
    message: '📦 ¿Qué gestor de paquetes querés usar?',
    options: [
      { label: 'npm', value: 'npm' },
      { label: 'pnpm', value: 'pnpm' },
    ],
  });
  if (isCancel(packageManager)) return cancelAndExit();

  
  const bundler = await select({
    message: '🔧 ¿Qué bundler querés usar?',
    options: [
      { label: 'Vite', value: 'Vite' },
      { label: 'Ninguno', value: 'Ninguno' },
    ],
  });
  if (isCancel(bundler)) return cancelAndExit();

  const projectName = await text({
    message: '📁 Nombre del proyecto:',
    validate: (value) =>
      /^[a-zA-Z0-9-_]+$/.test(value) ? undefined : 'Solo letras, números, guiones y guion bajo.',
  });
  if (isCancel(projectName)) return cancelAndExit();

  let packageName;

  if (bundler === "Vite") { // futuro cera Vite || CRA o cualquiera que necesite packageName
    packageName = await text({
      message: '📦 Nombre del package:',
      defaultValue: typeof projectName === 'string'
        ? projectName.toLowerCase().replace(/\s+/g, '-')
        : '',
      validate: (value) =>
        /^[a-z0-9-_]+$/.test(value) ? undefined : 'Solo minúsculas, números, guiones y guion bajo.',
    });
    if (isCancel(packageName)) return cancelAndExit();
  }

  const language = await select({
    message: '📝 ¿Qué lenguaje querés usar?',
    options: [
      { label: 'TypeScript', value: 'TypeScript' },
      { label: 'JavaScript', value: 'JavaScript' },
      { label: 'TypeScript + SWC', value: 'TypeScript + SWC' },
    ],
  });
  if (isCancel(language)) return cancelAndExit();


  return {
    projectName: projectName as string,
    packageName: (packageName ?? ''),
    bundler: bundler as UserAnswers['bundler'],
    language: language as UserAnswers['language'],
    packageManager: packageManager as UserAnswers['packageManager'],
  };
}

/**
 * Solicita al usuario si desea instalar TailwindCSS y en caso afirmativo,
 * le pregunta la versión deseada.
 *
 * @returns {Promise<Pick<UserAnswers, 'useTailwind' | 'tailwindVersion'> | { useTailwind: boolean } | null>}
 * Objeto parcial con la configuración Tailwind o null si se cancela.
 */
export async function promptTailwindConfig(): Promise<Pick<UserAnswers, 'useTailwind' | 'tailwindVersion'> | { useTailwind: boolean } | null> {
  const useTailwind = await confirm({
    message: '🎨 ¿Querés instalar TailwindCSS?',
    initialValue: true,
  });
  if (isCancel(useTailwind)) return cancelAndExit();

  let tailwindVersion: UserAnswers['tailwindVersion'] | undefined = undefined;
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
    return { useTailwind: true, tailwindVersion };
  }
  return { useTailwind: false };
}

/**
 * Consulta al usuario si desea instalar dependencias adicionales,
 * y en caso afirmativo, le solicita la lista separada por espacios.
 *
 * @returns {Promise<Pick<UserAnswers, 'installDeps' | 'depsList'> | { installDeps: boolean } | null>}
 * Objeto parcial con la configuración de dependencias o null si se cancela.
 */
export async function promptDepsConfig(): Promise<Pick<UserAnswers, 'installDeps' | 'depsList'> | { installDeps: boolean } | null> {
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
    return { installDeps: true, depsList };
  }
  return { installDeps: false };
}

/**
 * Pregunta al usuario si desea crear una estructura de carpetas dentro de src,
 * y en caso afirmativo, le solicita la estructura deseada.
 *
 * @returns {Promise<Pick<UserAnswers, 'createFolders' | 'folderStructure'> | { createFolders: boolean } | null>}
 * Objeto parcial con la configuración de carpetas o null si se cancela.
 */
export async function promptFolderStructureConfig(): Promise<Pick<UserAnswers, 'createFolders' | 'folderStructure'> | { createFolders: boolean } | null> {
  const createFolders = await confirm({
    message: '📁 ¿Querés crear carpetas dentro de src?',
    initialValue: false,
  });
  if (isCancel(createFolders)) return cancelAndExit();

  let folderStructure: string | undefined = undefined;
  if (createFolders) {
    folderStructure = await text({
      message: '📂 Ingresá estructura (ej: pages, components, shared/hooks/{useFetch.ts}, admin/users/{index.ts}, admin/settings):',
      validate: (value) =>
        value.trim().length > 0 ? undefined : 'Ingresá una estructura válida.',
    }) as string;
    if (isCancel(folderStructure)) return cancelAndExit();
    return { createFolders: true, folderStructure };
  }
  return { createFolders: false };
}