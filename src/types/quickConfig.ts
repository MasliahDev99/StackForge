

// interface utilizada para la configuracion de proyectos rapidos.

import { bundlerType, languageType, packageManagerType, tailwindVersionType } from "./types";

export interface QuickConfig {
    packageName: string;  // nombre del paquete en caso de usar bundler
    useTailwind: boolean; // configuracion de tailwind 
    useGit: boolean; // configuracion de git
    installDeps: boolean
    createFolders: boolean

    folderStructure?: string;
    depsList?: string;
    bundlerType: bundlerType
    languageType: languageType
    tailwindVersion: tailwindVersionType
    packageManager: packageManagerType
  }