import { GitConfig } from "../core/git/domain/gitConfig"; // interface
import { RepoCreationConfig } from "../core/git/domain/repoConfig"; // interface
import { RepoInfo } from "../core/git/domain/repoInfo"; // interface
import { bundlerType,languageType,tailwindVersionType,packageManagerType } from "./types";


export interface UserAnswers {
    projectName: string;
    packageName?: string;
    bundler: bundlerType;
    language: languageType;
    useTailwind: boolean;
    tailwindVersion?: tailwindVersionType
    installDeps: boolean;
    depsList?: string;
    createFolders: boolean;
    folderStructure?: string;
    packageManager: packageManagerType;

    // GitHub
    useGit?: boolean;
    gitConfig?: GitConfig;
    repoCreation?: RepoCreationConfig;
    repoInfo?: RepoInfo;
    
  }
  
