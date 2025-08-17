import { bundlerType, languageType, packageManagerType, tailwindVersionType } from "./types";
export interface QuickConfig {
    packageName: string;
    useTailwind: boolean;
    useGit: boolean;
    installDeps: boolean;
    createFolders: boolean;
    folderStructure?: string;
    depsList?: string;
    bundlerType: bundlerType;
    languageType: languageType;
    tailwindVersion: tailwindVersionType;
    packageManager: packageManagerType;
}
//# sourceMappingURL=quickConfig.d.ts.map