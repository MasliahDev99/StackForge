import { GitConfig } from "../core/git/domain/gitConfig";
import { RepoCreationConfig } from "../core/git/domain/repoConfig";
import { RepoInfo } from "../core/git/domain/repoInfo";
import { bundlerType, languageType, tailwindVersionType, packageManagerType } from "./types";
export interface UserAnswers {
    projectName: string;
    packageName?: string;
    bundler: bundlerType;
    language: languageType;
    useTailwind: boolean;
    tailwindVersion?: tailwindVersionType;
    installDeps: boolean;
    depsList?: string;
    createFolders: boolean;
    folderStructure?: string;
    packageManager: packageManagerType;
    useGit?: boolean;
    gitConfig?: GitConfig;
    repoCreation?: RepoCreationConfig;
    repoInfo?: RepoInfo;
}
